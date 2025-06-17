
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Zap, 
  Database, 
  Mail, 
  Calendar, 
  FileText, 
  Code, 
  Filter,
  ArrowRight,
  Clock,
  Bell,
  Users,
  BarChart3
} from 'lucide-react';

const nodeCategories = [
  {
    title: 'Triggers',
    nodes: [
      { type: 'trigger', label: 'Webhook Trigger', icon: Zap, color: 'bg-green-500' },
      { type: 'trigger', label: 'Schedule Trigger', icon: Clock, color: 'bg-blue-500' },
      { type: 'trigger', label: 'Manual Trigger', icon: ArrowRight, color: 'bg-purple-500' },
    ]
  },
  {
    title: 'Actions',
    nodes: [
      { type: 'action', label: 'Send Email', icon: Mail, color: 'bg-red-500' },
      { type: 'action', label: 'Database Query', icon: Database, color: 'bg-yellow-500' },
      { type: 'action', label: 'Create Event', icon: Calendar, color: 'bg-indigo-500' },
      { type: 'action', label: 'Generate Document', icon: FileText, color: 'bg-orange-500' },
      { type: 'action', label: 'Send Notification', icon: Bell, color: 'bg-pink-500' },
    ]
  },
  {
    title: 'Logic',
    nodes: [
      { type: 'condition', label: 'If Condition', icon: Filter, color: 'bg-cyan-500' },
      { type: 'code', label: 'Code Block', icon: Code, color: 'bg-gray-500' },
      { type: 'merge', label: 'Merge Data', icon: Users, color: 'bg-emerald-500' },
    ]
  },
  {
    title: 'Analytics',
    nodes: [
      { type: 'analytics', label: 'Data Analysis', icon: BarChart3, color: 'bg-violet-500' },
    ]
  }
];

const DraggableNode = ({ type, label, icon: Icon, color }: any) => {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeLabel: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', nodeLabel);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card 
      className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border border-gray-200 bg-white"
      draggable
      onDragStart={(event) => onDragStart(event, type, label)}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{label}</p>
          <p className="text-xs text-gray-500 capitalize">{type}</p>
        </div>
      </div>
    </Card>
  );
};

const Sidebar = () => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Workflow Nodes</h2>
        <p className="text-sm text-gray-600 mt-1">Drag and drop to build your workflow</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {nodeCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">{category.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.nodes.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {category.nodes.map((node, nodeIndex) => (
                  <DraggableNode
                    key={nodeIndex}
                    type={node.type}
                    label={node.label}
                    icon={node.icon}
                    color={node.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
