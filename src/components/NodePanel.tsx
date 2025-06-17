
import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, Copy, Trash2, Brain, Sparkles } from 'lucide-react';

interface NodePanelProps {
  node: Node;
  onClose: () => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (node: Node) => void;
  onUpdateNode: (nodeId: string, data: any) => void;
}

const NodePanel = ({ node, onClose, onDelete, onDuplicate, onUpdateNode }: NodePanelProps) => {
  const [nodeData, setNodeData] = useState(node.data);

  useEffect(() => {
    // Load saved data from localStorage on mount
    if (node.type === 'openai' || node.type === 'gemini') {
      const savedApiKey = localStorage.getItem(`${node.type}_apiKey_${node.id}`);
      const savedPrompt = localStorage.getItem(`${node.type}_prompt_${node.id}`);
      const savedModel = localStorage.getItem(`${node.type}_model_${node.id}`);
      const savedTemperature = localStorage.getItem(`${node.type}_temperature_${node.id}`);
      
      if (savedApiKey || savedPrompt || savedModel || savedTemperature) {
        const updatedData = {
          ...nodeData,
          apiKey: savedApiKey || nodeData.apiKey,
          prompt: savedPrompt || nodeData.prompt,
          model: savedModel || nodeData.model,
          temperature: savedTemperature ? parseFloat(savedTemperature) : nodeData.temperature,
        };
        setNodeData(updatedData);
        onUpdateNode(node.id, updatedData);
      }
    }
  }, [node.id, node.type]);

  const updateNodeData = (key: string, value: string | number) => {
    const updatedData = { ...nodeData, [key]: value };
    setNodeData(updatedData);
    onUpdateNode(node.id, updatedData);
    
    // Save to localStorage for AI nodes
    if (node.type === 'openai' || node.type === 'gemini') {
      localStorage.setItem(`${node.type}_${key}_${node.id}`, value.toString());
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'openai':
        return <Brain className="h-5 w-5 text-green-600" />;
      case 'gemini':
        return <Sparkles className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const renderAINodeConfig = () => {
    if (node.type === 'openai' || node.type === 'gemini') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={(nodeData.apiKey as string) || ''}
              onChange={(e) => updateNodeData('apiKey', e.target.value)}
              placeholder={`Enter ${node.type === 'openai' ? 'OpenAI' : 'Gemini'} API key`}
            />
          </div>
          
          <div>
            <Label htmlFor="model">Model</Label>
            <Select 
              value={(nodeData.model as string) || ''} 
              onValueChange={(value) => updateNodeData('model', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {node.type === 'openai' ? (
                  <>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={(nodeData.prompt as string) || ''}
              onChange={(e) => updateNodeData('prompt', e.target.value)}
              placeholder="Enter your prompt"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={(nodeData.temperature as number) || 0.7}
              onChange={(e) => updateNodeData('temperature', parseFloat(e.target.value))}
              placeholder="0.7"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={(nodeData.label as string) || ''}
            onChange={(e) => updateNodeData('label', e.target.value)}
            placeholder="Enter node label"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={(nodeData.description as string) || ''}
            onChange={(e) => updateNodeData('description', e.target.value)}
            placeholder="Enter node description"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getNodeIcon()}
          <h3 className="font-semibold text-gray-900">
            {node.type === 'openai' ? 'OpenAI Configuration' : 
             node.type === 'gemini' ? 'Gemini Configuration' : 
             'Node Configuration'}
          </h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <Card className="p-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Node Info</h4>
            <p className="text-sm text-gray-500">ID: {node.id}</p>
            <p className="text-sm text-gray-500">Type: {node.type}</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Configuration</h4>
            {renderAINodeConfig()}
          </div>
        </Card>
      </div>
      
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDuplicate(node)}
          className="w-full"
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate Node
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(node.id)}
          className="w-full"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Node
        </Button>
      </div>
    </div>
  );
};

export default NodePanel;
