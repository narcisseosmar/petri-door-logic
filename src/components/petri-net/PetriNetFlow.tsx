import React, { useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import PlaceNode from './PlaceNode';
import TransitionNode from './TransitionNode';
import { usePetriNet } from '@/hooks/usePetriNet';

const nodeTypes = {
  place: PlaceNode,
  transition: TransitionNode,
};

export const PetriNetFlow = () => {
  const { state, fireTransition } = usePetriNet();

  const initialNodes: Node[] = [
    {
      id: 'P1',
      type: 'place',
      position: { x: 100, y: 100 },
      data: {
        label: 'P1',
        description: 'Porte fermée',
        tokens: state.places.P1,
        active: state.places.P1 > 0,
      },
    },
    {
      id: 'P2',
      type: 'place',
      position: { x: 400, y: 100 },
      data: {
        label: 'P2',
        description: 'Personne détectée',
        tokens: state.places.P2,
        active: state.places.P2 > 0,
      },
    },
    {
      id: 'P3',
      type: 'place',
      position: { x: 400, y: 300 },
      data: {
        label: 'P3',
        description: 'Porte ouverte',
        tokens: state.places.P3,
        active: state.places.P3 > 0,
      },
    },
    {
      id: 'P4',
      type: 'place',
      position: { x: 100, y: 300 },
      data: {
        label: 'P4',
        description: 'Temporisation active',
        tokens: state.places.P4,
        active: state.places.P4 > 0,
      },
    },
    {
      id: 'T1',
      type: 'transition',
      position: { x: 250, y: 85 },
      data: {
        label: 'T1',
        description: 'Détection personne',
        enabled: state.transitions.T1,
        onClick: () => fireTransition('T1'),
      },
    },
    {
      id: 'T2',
      type: 'transition',
      position: { x: 415, y: 200 },
      data: {
        label: 'T2',
        description: 'Ouverture porte',
        enabled: state.transitions.T2,
        onClick: () => fireTransition('T2'),
      },
    },
    {
      id: 'T3',
      type: 'transition',
      position: { x: 250, y: 315 },
      data: {
        label: 'T3',
        description: 'Fin temporisation',
        enabled: state.transitions.T3,
        onClick: () => fireTransition('T3'),
      },
    },
    {
      id: 'T4',
      type: 'transition',
      position: { x: 85, y: 200 },
      data: {
        label: 'T4',
        description: 'Fermeture porte',
        enabled: state.transitions.T4,
        onClick: () => fireTransition('T4'),
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'P1-T1',
      source: 'P1',
      target: 'T1',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T1,
    },
    {
      id: 'T1-P2',
      source: 'T1',
      target: 'P2',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T1,
    },
    {
      id: 'P2-T2',
      source: 'P2',
      target: 'T2',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T2,
    },
    {
      id: 'T2-P3',
      source: 'T2',
      target: 'P3',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T2,
    },
    {
      id: 'P3-T3',
      source: 'P3',
      target: 'T3',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T3,
    },
    {
      id: 'T3-P4',
      source: 'T3',
      target: 'P4',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T3,
    },
    {
      id: 'P4-T4',
      source: 'P4',
      target: 'T4',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T4,
    },
    {
      id: 'T4-P1',
      source: 'T4',
      target: 'P1',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: state.transitions.T4,
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when state changes
  const updateNodes = useCallback(() => {
    setNodes(nodes => 
      nodes.map(node => {
        if (node.type === 'place') {
          const placeId = node.id as keyof typeof state.places;
          return {
            ...node,
            data: {
              ...node.data,
              tokens: state.places[placeId],
              active: state.places[placeId] > 0,
            },
          };
        }
        if (node.type === 'transition') {
          const transitionId = node.id as keyof typeof state.transitions;
          return {
            ...node,
            data: {
              ...node.data,
              enabled: state.transitions[transitionId],
              onClick: () => fireTransition(transitionId),
            },
          };
        }
        return node;
      })
    );
  }, [state, fireTransition, setNodes]);

  // Update edges when state changes
  const updateEdges = useCallback(() => {
    setEdges(edges => 
      edges.map(edge => ({
        ...edge,
        animated: edge.id.includes('T1') ? state.transitions.T1 :
                 edge.id.includes('T2') ? state.transitions.T2 :
                 edge.id.includes('T3') ? state.transitions.T3 :
                 edge.id.includes('T4') ? state.transitions.T4 : false,
      }))
    );
  }, [state.transitions, setEdges]);

  // Update nodes and edges when state changes
  React.useEffect(() => {
    updateNodes();
    updateEdges();
  }, [updateNodes, updateEdges]);

  return (
    <div className="h-96 w-full petri-flow rounded-lg border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="petri-flow"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};