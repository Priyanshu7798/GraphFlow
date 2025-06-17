
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, ArrowRight } from 'lucide-react';

interface TriggerNodeData {
  label: string;
  description: string;
}

const TriggerNode = ({ data, selected }: NodeProps<TriggerNodeData>) => {
  const getIcon = () => {
    if (data.label?.includes('Schedule')) return Clock;
    if (data.label?.includes('Manual')) return ArrowRight;
    return Zap;
  };

  const Icon = getIcon();

  return (
    <Card className={`min-w-[200px] ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{data.label}</h4>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Trigger
          </Badge>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-green-500 bg-white"
      />
    </Card>
  );
};

export default TriggerNode;
