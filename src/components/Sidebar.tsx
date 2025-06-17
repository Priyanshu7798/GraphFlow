
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Mail, 
  Filter, 
  Code, 
  Users, 
  BarChart3,
  Database,
  Calendar,
  FileText,
  Bell
} from 'lucide-react';

const nodeCategories = [
  {
    category: 'Triggers',
    nodes: [
      { type: 'trigger', label: 'Webhook Trigger', icon: Zap, description: 'HTTP webhook trigger' },
      { type: 'trigger', label: 'Schedule Trigger', icon: Calendar, description: 'Time-based trigger' },
    ]
  },
  {
    category: 'Actions',
    nodes: [
      { type: 'action', label: 'Send Email', icon: Mail, description: 'Send email notification' },
      { type: 'action', label: 'Database Query', icon: Database, description: 'Execute database query' },
      { type: 'action', label: 'Create Event', icon: Calendar, description: 'Create calendar event' },
      { type: 'action', label: 'Generate Document', icon: FileText, description: 'Generate document' },
      { type: 'action', label: 'Push Notification', icon: Bell, description: 'Send push notification' },
    ]
  },
  {
    category: 'Logic',
    nodes: [
      { type: 'condition', label: 'If Condition', icon: Filter, description: 'Conditional logic' },
      { type: 'code', label: 'Code Block', icon: Code, description: 'Custom code execution' },
      { type: 'merge', label: 'Merge Data', icon: Users, description: 'Merge multiple inputs' },
    ]
  },
  {
    category: 'Analytics',
    nodes: [
      { type: 'analytics', label: 'Track Event', icon: BarChart3, description: 'Track analytics event' },
      { type: 'analytics', label: 'Generate Report', icon: BarChart3, description: 'Generate analytics report' },
    ]
  }
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeLabel: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', nodeLabel);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">Workflow Nodes</h2>
        <p className="text-sm text-gray-500 mt-1">Drag nodes to canvas</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {nodeCategories.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.nodes.map((node, index) => {
                  const IconComponent = node.icon;
                  return (
                    <Card
                      key={`${node.type}-${index}`}
                      className="p-3 cursor-grab hover:shadow-md hover:border-blue-300 transition-all duration-200 border-gray-200 bg-white"
                      draggable
                      onDragStart={(e) => onDragStart(e, node.type, node.label)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {node.label}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {node.description}
                          </p>
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {node.type}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="text-xs text-gray-500 text-center">
          <p>Drag & drop nodes to build workflows</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
