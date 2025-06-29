import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function SignatureBox({ id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    width: '100px',
    height: '40px',
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    border: '1px dashed blue',
    position: 'absolute',
    top: 100,
    left: 100,
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Signature
    </div>
  );
}

export default SignatureBox;
