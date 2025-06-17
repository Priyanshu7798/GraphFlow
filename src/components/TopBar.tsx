import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Save, 
  Download, 
  Upload, 
  Settings, 
  Zap,
  Activity,
  GitBranch
} from 'lucide-react';
import { Node, Edge } from '@xyflow/react';
import WorkflowExecutor from './WorkflowExecutor';
import { toast } from '@/hooks/use-toast';

interface TopBarProps {
  nodes: Node[];
  edges: Edge[];
}

const TopBar = ({ nodes, edges }: TopBarProps) => {
  const [showExecutor, setShowExecutor] = useState(false);

  const handleSave = () => {
    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved successfully.",
    });
  };

  const handleExport = () => {
    const workflowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Workflow Exported",
      description: "Your workflow has been exported as JSON.",
    });
  };

  const handleExecute = () => {
    if (nodes.length === 0) {
      toast({
        title: "No Workflow",
        description: "Please add nodes to your workflow before executing.",
        variant: "destructive",
      });
      return;
    }
    setShowExecutor(true);
  };

  const getNodeCountByType = (type: string) => {
    return nodes.filter(node => node.type === type).length;
  };

  const getAINodeCount = () => {
    return nodes.filter(node => node.type === 'openai' || node.type === 'gemini').length;
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-7 w-7 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Graph Flow</h1>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>{nodes.length} nodes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>{edges.length} connections</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-6 w-px bg-gray-300" />
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Import
              </Button>
              
              
              <Button 
                onClick={handleExecute}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <Play className="h-4 w-4 mr-1" />
                Execute Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showExecutor && (
        <WorkflowExecutor
          nodes={nodes}
          edges={edges}
          onClose={() => setShowExecutor(false)}
          onExecutionComplete={() => {
            toast({
              title: "Execution Complete",
              description: "Workflow execution has finished.",
            });
          }}
        />
      )}
    </>
  );
};

export default TopBar;
