
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Node, Edge } from '@xyflow/react';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface WorkflowExecutorProps {
  nodes: Node[];
  edges: Edge[];
  onClose: () => void;
  onExecutionComplete: () => void;
}

interface ExecutionStep {
  id: string;
  nodeId: string;
  nodeName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  output?: any;
  error?: string;
}

const WorkflowExecutor = ({ nodes, edges, onClose, onExecutionComplete }: WorkflowExecutorProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize execution steps based on nodes
    const executionSteps: ExecutionStep[] = nodes.map((node, index) => ({
      id: `step-${index}`,
      nodeId: node.id,
      nodeName: (node.data?.label as string) || node.type || 'Unknown Node',
      status: 'pending',
    }));
    setSteps(executionSteps);
  }, [nodes]);

  const simulateExecution = async () => {
    setIsRunning(true);
    
    for (let i = 0; i < steps.length; i++) {
      // Update current step to running
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ));
      setCurrentStep(i);
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Simulate success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      const duration = Math.floor(500 + Math.random() * 2000);
      
      setSteps(prev => prev.map((step, index) => 
        index === i ? { 
          ...step, 
          status: isSuccess ? 'completed' : 'failed',
          duration,
          output: isSuccess ? generateMockOutput(nodes[i]) : undefined,
          error: !isSuccess ? 'Execution failed due to network timeout' : undefined
        } : step
      ));
      
      setProgress(((i + 1) / steps.length) * 100);
      
      if (!isSuccess) {
        break; // Stop execution on failure
      }
    }
    
    setIsRunning(false);
    onExecutionComplete();
  };

  const generateMockOutput = (node: Node) => {
    const nodeType = node.type;
    switch (nodeType) {
      case 'trigger':
        return { status: 'triggered', timestamp: new Date().toISOString(), data: { userId: '12345', event: 'webhook_received' } };
      case 'action':
        return { status: 'completed', result: 'Email sent successfully', recipients: ['user@example.com'] };
      case 'condition':
        return { condition_met: true, result: 'true', evaluation: 'data.status === "success"' };
      case 'code':
        return { status: 'executed', result: { processed: true, count: 42 }, logs: ['Processing started', 'Data validated', 'Execution completed'] };
      case 'analytics':
        return { event_tracked: true, metrics: { page_views: 1234, conversions: 56 } };
      default:
        return { status: 'completed', message: 'Node executed successfully' };
    }
  };

  const getStatusIcon = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-700">Running</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Workflow Execution</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          
          {/* Execution Steps */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Execution Steps</h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 border rounded-lg transition-all ${
                    step.status === 'running' ? 'border-blue-300 bg-blue-50' :
                    step.status === 'completed' ? 'border-green-300 bg-green-50' :
                    step.status === 'failed' ? 'border-red-300 bg-red-50' :
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(step.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{step.nodeName}</h4>
                        <p className="text-sm text-gray-500">Node ID: {step.nodeId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {step.duration && (
                        <span className="text-xs text-gray-500">{step.duration}ms</span>
                      )}
                      {getStatusBadge(step.status)}
                    </div>
                  </div>
                  
                  {step.output && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Output:</h5>
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {JSON.stringify(step.output, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {step.error && (
                    <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                      <h5 className="text-sm font-medium text-red-700 mb-1">Error:</h5>
                      <p className="text-sm text-red-600">{step.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={simulateExecution} 
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? 'Executing...' : 'Start Execution'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowExecutor;
