
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

interface AnalyticsNodeData {
  label: string;
  description: string;
}

const AnalyticsNode = ({ data, selected }: NodeProps<AnalyticsNodeData>) => {
  return (
    <Card className={`min-w-[200px] ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{data.label}</h4>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Analytics
          </Badge>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-indigo-500 bg-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-indigo-500 bg-white"
      />
    </Card>
  );
};

export default AnalyticsNode;
