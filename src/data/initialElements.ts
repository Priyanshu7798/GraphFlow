
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'welcome-trigger',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Webhook Trigger',
      description: 'Receives HTTP requests to start the workflow'
    },
  },
  {
    id: 'process-action',
    type: 'action',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Process Data',
      description: 'Processes incoming webhook data'
    },
  },
  {
    id: 'condition-check',
    type: 'condition',
    position: { x: 700, y: 100 },
    data: { 
      label: 'Validate Data',
      description: 'Checks if data meets requirements'
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'trigger-to-action',
    source: 'welcome-trigger',
    target: 'process-action',
    type: 'customEdge',
    animated: true,
  },
  {
    id: 'action-to-condition',
    source: 'process-action',
    target: 'condition-check',
    type: 'customEdge',
    animated: true,
  },
];
