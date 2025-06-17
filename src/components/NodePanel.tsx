
import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Copy, Trash2 } from 'lucide-react';

interface NodePanelProps {
  node: Node;
  onClose: () => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (node: Node) => void;
}

const NodePanel = ({ node, onClose, onDelete, onDuplicate }: NodePanelProps) => {
  const [label, setLabel] = useState(node.data?.label || '');
  const [description, setDescription] = useState(node.data?.description || '');
  const [config, setConfig] = useState({
    url: node.data?.url || '',
    method: node.data?.method || 'GET',
    headers: node.data?.headers || '',
    timeout: node.data?.timeout || '30',
    retries: node.data?.retries || '3',
    condition: node.data?.condition || '',
  });

  const handleConfigChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const renderNodeSpecificConfig = () => {
    switch (node.type) {
      case 'trigger':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Webhook URL</Label>
              <Input
                id="url"
                value={config.url}
                onChange={(e) => handleConfigChange('url', e.target.value)}
                placeholder="https://api.example.com/webhook"
              />
            </div>
            <div>
              <Label htmlFor="method">HTTP Method</Label>
              <Input
                id="method"
                value={config.method}
                onChange={(e) => handleConfigChange('method', e.target.value)}
                placeholder="GET, POST, PUT, DELETE"
              />
            </div>
          </div>
        );
      
      case 'action':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">API Endpoint</Label>
              <Input
                id="url"
                value={config.url}
                onChange={(e) => handleConfigChange('url', e.target.value)}
                placeholder="https://api.example.com/action"
              />
            </div>
            <div>
              <Label htmlFor="headers">Headers (JSON)</Label>
              <Textarea
                id="headers"
                value={config.headers}
                onChange={(e) => handleConfigChange('headers', e.target.value)}
                placeholder='{"Authorization": "Bearer token"}'
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="timeout">Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                value={config.timeout}
                onChange={(e) => handleConfigChange('timeout', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="condition">Condition Expression</Label>
              <Textarea
                id="condition"
                value={config.condition}
                onChange={(e) => handleConfigChange('condition', e.target.value)}
                placeholder="data.status === 'success' && data.count > 0"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="retries">Max Retries</Label>
              <Input
                id="retries"
                type="number"
                value={config.retries}
                onChange={(e) => handleConfigChange('retries', e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="timeout">Execution Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                value={config.timeout}
                onChange={(e) => handleConfigChange('timeout', e.target.value)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <Card className="border-0 rounded-none h-full">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{node.type} Node</CardTitle>
              <Badge variant="outline">{node.id}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Basic Settings</h3>
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Node label"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Node description"
                rows={2}
              />
            </div>
          </div>

          {/* Node Specific Configuration */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Configuration</h3>
            {renderNodeSpecificConfig()}
          </div>

          {/* Node Actions */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900">Actions</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDuplicate(node)}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(node.id)}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Node Information */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900">Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>ID: {node.id}</div>
              <div>Type: {node.type}</div>
              <div>Position: {Math.round(node.position.x)}, {Math.round(node.position.y)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NodePanel;
