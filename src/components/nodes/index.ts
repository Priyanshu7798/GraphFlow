
import TriggerNode from './TriggerNode';
import ActionNode from './ActionNode';
import ConditionNode from './ConditionNode';
import CodeNode from './CodeNode';
import MergeNode from './MergeNode';
import AnalyticsNode from './AnalyticsNode';

export const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  code: CodeNode,
  merge: MergeNode,
  analytics: AnalyticsNode,
};
