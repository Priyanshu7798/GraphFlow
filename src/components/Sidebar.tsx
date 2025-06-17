
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
  Calendar,
  Database,
  Clock,
  ArrowRight
} from 'lucide-react';

const nodeCategories = [
  {
    category: 'Triggers',
    nodes: [
      {
        type: 'trigger',
        label: 'Webhook Trigger',
        description: 'Trigger workflow via HTTP request',
        icon: Zap,
        color: 'bg-green-100 text-green-600'
      },
      {
        type: 'trigger',
        label: 'Schedule Trigger',
        description: 'Trigger workflow on schedule',
        icon: Clock,
        color: 'bg-green-100 text-green-600'
      },
      {
        type: 'trigger',
        label: 'Manual Trigger',
        description: 'Manually trigger workflow',
        icon: ArrowRight,
        color: 'bg-green-100 text-green-600'
      }
    ]
  },
  {
    category: 'Actions',
    nodes: [
      {
        type: 'action',
        label: 'Send Email',
        description: 'Send email notification',
        icon: Mail,
        color: 'bg-blue-100 text-blue-600'
      },
      {
        type: 'action',
        label: 'Database Update',
        description: 'Update database record',
        icon: Database,
        color: 'bg-blue-100 text-blue-600'
      },
      {
        type: 'action',
        label: 'Create Event',
        description: 'Create calendar event',
        icon: Calendar,
        color: 'bg-blue-100 text-blue-600'
      }
    ]
  },
  {
    category: 'Logic',
    nodes: [
      {
        type: 'condition',
        label: 'Condition',
        description: 'Conditional branching',
        icon: Filter,
        color: 'bg-yellow-100 text-yellow-600'
      },
      {
        type: 'code',
        label: 'Code Block',
        description: 'Execute custom code',
        icon: Code,
        color: 'bg-gray-100 text-gray-600'
      },
      {
        type: 'merge',
        label: 'Merge',
        description: 'Merge multiple paths',
        icon: Users,
        color: 'bg-purple-100 text-purple-600'
      }
    ]
  },
  {
    category: 'Analytics',
    nodes: [
      {
        type: 'analytics',
        label: 'Track Event',
        description: 'Track analytics event',
        icon: BarChart3,
        color: 'bg-indigo-100 text-indigo-600'
      }
    ]
  }
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
        
        <div className="space-y-6">
          {nodeCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.nodes.map((node, index) => (
                  <Card
                    key={`${node.type}-${index}`}
                    className="p-3 cursor-grab hover:shadow-md transition-shadow border border-gray-200"
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type, node.label)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${node.color}`}>
                        <node.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {node.label}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-900">Pro Tip</span>
          </div>
          <p className="text-xs text-blue-700">
            Drag and drop components onto the canvas to build your workflow. 
            Connect nodes by dragging from output handles to input handles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
