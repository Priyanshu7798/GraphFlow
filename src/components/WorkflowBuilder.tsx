
import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Connection,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from '@/data/initialElements';
import { nodeTypes } from '@/components/nodes';
import { edgeTypes } from '@/components/edges';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import NodePanel from '@/components/NodePanel';
import { toast } from '@/hooks/use-toast';

let id = 0;
const getId = () => `dndnode_${id++}`;

const WorkflowBuilderFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `edge-${id++}`,
        type: 'customEdge',
        animated: true,
      };
      setEdges((eds) => addEdge(newEdge, eds));
      toast({
        title: "Connection Created",
        description: "Nodes have been successfully connected.",
      });
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { 
          label: label || `${type} node`,
          description: `A ${type} node for workflow automation`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast({
        title: "Node Added",
        description: `${label || type} node has been added to the workflow.`,
      });
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
    toast({
      title: "Node Deleted",
      description: "Node and its connections have been removed.",
    });
  }, [setNodes, setEdges]);

  const duplicateNode = useCallback((node: Node) => {
    const newNode: Node = {
      ...node,
      id: getId(),
      position: {
        x: node.position.x + 100,
        y: node.position.y + 100,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    toast({
      title: "Node Duplicated",
      description: "Node has been successfully duplicated.",
    });
  }, [setNodes]);

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar nodes={nodes} edges={edges} />
        
        {/* Workflow Canvas */}
        <div className="flex-1 flex">
          <div className="flex-1 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              className="bg-gray-50"
              attributionPosition="bottom-left"
            >
              <Controls 
                className="bg-white shadow-lg border border-gray-200 rounded-lg" 
                showInteractive={false}
              />
              <MiniMap 
                className="bg-white shadow-lg border border-gray-200 rounded-lg"
                nodeColor="#8b5cf6"
                maskColor="rgba(0, 0, 0, 0.1)"
              />
              <Background 
                variant="dots" 
                gap={20} 
                size={1} 
                color="#e5e7eb"
              />
            </ReactFlow>
          </div>
          
          {/* Node Configuration Panel */}
          {selectedNode && (
            <NodePanel 
              node={selectedNode} 
              onClose={() => setSelectedNode(null)}
              onDelete={deleteNode}
              onDuplicate={duplicateNode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const WorkflowBuilder = () => {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderFlow />
    </ReactFlowProvider>
  );
};

export default WorkflowBuilder;
