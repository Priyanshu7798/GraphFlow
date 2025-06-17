
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Copy, 
  Trash2, 
  Settings,
  Info,
  Edit3
} from 'lucide-react';
import { Node } from '@xyflow/react';

interface NodePanelProps {
  node: Node;
  onClose: () => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (node: Node) => void;
}

const NodePanel = ({ node, onClose, onDelete, onDuplicate }: NodePanelProps) => {
  const [nodeData, setNodeData] = useState(node.data);

  const handleDataChange = (key: string, value: string) => {
    setNodeData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Node Configuration</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Node Info */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Node Type</Label>
                <Badge variant="secondary" className="capitalize">
                  {node.type}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="node-id" className="text-sm font-medium">Node ID</Label>
                <Input 
                  id="node-id"
                  value={node.id} 
                  disabled 
                  className="bg-gray-50"
                />
              </div>
            </div>
          </Card>

          {/* Configuration */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Edit3 className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium text-gray-900">Configuration</h4>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="node-label" className="text-sm font-medium">Label</Label>
                  <Input 
                    id="node-label"
                    value={nodeData.label || ''} 
                    onChange={(e) => handleDataChange('label', e.target.value)}
                    placeholder="Enter node label"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="node-description" className="text-sm font-medium">Description</Label>
                  <Textarea 
                    id="node-description"
                    value={nodeData.description || ''} 
                    onChange={(e) => handleDataChange('description', e.target.value)}
                    placeholder="Enter node description"
                    rows={3}
                  />
                </div>

                {/* Type-specific configurations */}
                {node.type === 'trigger' && (
                  <div className="space-y-2">
                    <Label htmlFor="trigger-url" className="text-sm font-medium">Webhook URL</Label>
                    <Input 
                      id="trigger-url"
                      value={nodeData.webhookUrl || ''} 
                      onChange={(e) => handleDataChange('webhookUrl', e.target.value)}
                      placeholder="https://example.com/webhook"
                    />
                  </div>
                )}

                {node.type === 'action' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="action-endpoint" className="text-sm font-medium">API Endpoint</Label>
                      <Input 
                        id="action-endpoint"
                        value={nodeData.endpoint || ''} 
                        onChange={(e) => handleDataChange('endpoint', e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="action-method" className="text-sm font-medium">HTTP Method</Label>
                      <Input 
                        id="action-method"
                        value={nodeData.method || 'POST'} 
                        onChange={(e) => handleDataChange('method', e.target.value)}
                        placeholder="POST, GET, PUT, DELETE"
                      />
                    </div>
                  </>
                )}

                {node.type === 'condition' && (
                  <div className="space-y-2">
                    <Label htmlFor="condition-expression" className="text-sm font-medium">Condition Expression</Label>
                    <Textarea 
                      id="condition-expression"
                      value={nodeData.expression || ''} 
                      onChange={(e) => handleDataChange('expression', e.target.value)}
                      placeholder="e.g., data.status === 'active'"
                      rows={2}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Position Info */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium text-gray-900">Position</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">X Position</Label>
                  <Input 
                    value={Math.round(node.position.x)} 
                    disabled 
                    className="bg-gray-50 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Y Position</Label>
                  <Input 
                    value={Math.round(node.position.y)} 
                    disabled 
                    className="bg-gray-50 text-sm"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={() => onDuplicate(node)}
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate Node
        </Button>
        
        <Button 
          variant="destructive" 
          className="w-full justify-start" 
          onClick={() => onDelete(node.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Node
        </Button>
      </div>
    </div>
  );
};

export default NodePanel;
