import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface PlaceNodeProps {
  data: {
    label: string;
    description: string;
    tokens: number;
    active: boolean;
  };
}

const PlaceNode = memo(({ data }: PlaceNodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      
      <div 
        className={`petri-place ${data.active ? 'active' : ''}`}
        title={data.description}
      >
        <span className="font-bold">{data.label}</span>
        {data.tokens > 0 && (
          <div className="token" style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' 
          }} />
        )}
      </div>
    </>
  );
});

PlaceNode.displayName = 'PlaceNode';

export default PlaceNode;