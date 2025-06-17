
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Database, Calendar, FileText, Bell } from 'lucide-react';

const ActionNode = ({ data, selected }: NodeProps) => {
  const getIcon = () => {
    if (data.label?.includes('Email')) return Mail;
    if (data.label?.includes('Database')) return Database;
    if (data.label?.includes('Event')) return Calendar;
    if (data.label?.includes('Document')) return FileText;
    if (data.label?.includes('Notification')) return Bell;
    return Mail;
  };

  const Icon = getIcon();

  return (
    <Card className={`min-w-[200px] ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{data.label}</h4>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            Action
          </Badge>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-blue-500 bg-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-blue-500 bg-white"
      />
    </Card>
  );
};

export default ActionNode;
