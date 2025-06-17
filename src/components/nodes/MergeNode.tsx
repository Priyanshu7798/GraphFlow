
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

const MergeNode = ({ data, selected }: NodeProps) => {
  return (
    <Card className={`min-w-[200px] ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{data.label}</h4>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Merge
          </Badge>
        </div>
      </div>
      
      <Handle
        id="input1"
        type="target"
        position={Position.Left}
        style={{ top: '30%' }}
        className="w-3 h-3 border-2 border-purple-500 bg-white"
      />
      <Handle
        id="input2"
        type="target"
        position={Position.Left}
        style={{ top: '70%' }}
        className="w-3 h-3 border-2 border-purple-500 bg-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-purple-500 bg-white"
      />
    </Card>
  );
};

export default MergeNode;
