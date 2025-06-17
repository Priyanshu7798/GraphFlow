
import TriggerNode from './TriggerNode';
import ActionNode from './ActionNode';
import ConditionNode from './ConditionNode';
import CodeNode from './CodeNode';
import MergeNode from './MergeNode';
import AnalyticsNode from './AnalyticsNode';
import OpenAINode from './OpenAINode';
import GeminiNode from './GeminiNode';

export const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  code: CodeNode,
  merge: MergeNode,
  analytics: AnalyticsNode,
  openai: OpenAINode,
  gemini: GeminiNode,
};
