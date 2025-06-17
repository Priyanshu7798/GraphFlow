
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Save, 
  Download, 
  Upload, 
  Settings, 
  Share,
  Eye,
  Pause
} from 'lucide-react';
import { Node, Edge } from '@xyflow/react';
import { toast } from '@/hooks/use-toast';

interface TopBarProps {
  nodes: Node[];
  edges: Edge[];
}

const TopBar = ({ nodes, edges }: TopBarProps) => {
  const handleSave = () => {
    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved successfully.",
    });
  };

  const handleExecute = () => {
    toast({
      title: "Workflow Executed",
      description: "Your workflow is now running...",
    });
  };

  const handleExport = () => {
    const workflowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `workflow-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Workflow Exported",
      description: "Your workflow has been downloaded as JSON.",
    });
  };

  return (
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
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <Button size="sm" onClick={handleExecute}>
          <Play className="h-4 w-4 mr-2" />
          Execute
        </Button>
        
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
