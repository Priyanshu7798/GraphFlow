
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Node, Edge } from '@xyflow/react';
import { Play, Save, Download, Upload, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import WorkflowExecutor from './WorkflowExecutor';

interface TopBarProps {
  nodes: Node[];
  edges: Edge[];
}

const TopBar = ({ nodes, edges }: TopBarProps) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [showExecutor, setShowExecutor] = useState(false);

  const handleRunWorkflow = () => {
    if (nodes.length === 0) {
      toast({
        title: "No Workflow",
        description: "Please add some nodes to run the workflow.",
        variant: "destructive",
      });
      return;
    }
    setShowExecutor(true);
  };

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
      description: "Your workflow has been exported successfully.",
    });
  };

  return (
    <>
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Workflow Builder</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {nodes.length} nodes
            </Badge>
            <Badge variant="outline" className="text-xs">
              {edges.length} connections
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button
            onClick={handleRunWorkflow}
            disabled={isExecuting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="h-4 w-4 mr-2" />
            {isExecuting ? 'Running...' : 'Run Workflow'}
          </Button>
        </div>
      </div>
      
      {showExecutor && (
        <WorkflowExecutor
          nodes={nodes}
          edges={edges}
          onClose={() => setShowExecutor(false)}
          onExecutionComplete={() => setIsExecuting(false)}
        />
      )}
    </>
  );
};

export default TopBar;
