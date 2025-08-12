import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface TransitionNodeProps {
  data: {
    label: string;
    description: string;
    enabled: boolean;
    onClick: () => void;
  };
}

const TransitionNode = memo(({ data }: TransitionNodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      
      <div 
        className={`petri-transition ${data.enabled ? 'enabled' : ''}`}
        title={data.description}
        onClick={data.enabled ? data.onClick : undefined}
      >
        <span className="font-bold">{data.label}</span>
      </div>
    </>
  );
});

TransitionNode.displayName = 'TransitionNode';

export default TransitionNode;