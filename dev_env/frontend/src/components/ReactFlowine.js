import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

import ReactFlow, { MiniMap, Controls, Background, applyNodeChanges,
  applyEdgeChanges, addEdge, Handle } from "react-flow-renderer";

import flowine from "flowine";
import canvasExample from "../sampledata/canvas1";

import { FLOWINE_NODELIBRARY_ } from 'flowine';

/* 
export const onButtonClick_init = e => {
  setFlowineState(flowine.init());
}

export const onButtonClick_createCanvas = e => {
  setFlowineState(flowine.createCanvas("MyCanvas"));
}

export const onButtonClick_createNode = e => {
  setFlowineState(flowine.createNode("UPPERCASE"));
}

export const onButtonClick_createEdge = e => {
  setFlowineState(flowine.createEdge(
    "340448a3-f42c-4d33-90cb-719f24093668_o_1",
    "72940d70-3420-445a-aed6-49d9c416f710_i_1" 
  ));
}

export const onButtonClick_openCanvas = e => {
  setFlowineState(flowine.openCanvas(canvasExample));
}

export const onButtonClick_runNode = e => {
  setFlowineState(flowine.runNode("340448a3-f42c-4d33-90cb-719f24093668"));
}

export const onButtonClick_solveGraph = e => {
  setFlowineState(flowine.solveGraph());
}

const setFlowineState = flowineObject => {
  console.log(flowineObject);
  if (flowineObject.result !== "error") return setFl(flowine);
  else setFl(fl);
  
} */

/* const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } }
]; */

const transformFlowineNodes = canvas => {
  const returnNodes = canvas.body?.nodes.map((node, i) => (
    { 
      id: node.id,
      data: { label: "www" },
      position: { x: 250, y: 0+i*100 },
      type: "TEXT",
      style: { border: '1px solid #777', padding: 10 }
    }
  ));

  console.log(returnNodes)

  return returnNodes;
}

const transformFlowineEdges = canvas => {
  const returnEdges = canvas.body?.edges.map((edge, id) => (
    { 
      id: edge.id,
      source: flowine.getPortObjectById(edge.sourcePortId).holderNodeId,
      target: flowine.getPortObjectById(edge.targetPortId).holderNodeId,
      sourceHandle: "",
      targetHandle: "" 
    }
  ));

  console.log(returnEdges);

  return returnEdges;
}

const TextNode = node => {
  return (
    <div>
      <Handle 
        type="target"
        position="left"
      />
      {/* <div>jlkj</div> */}
      <div>{node.data.label}</div>
      <Handle 
        type="source"
        position="right"
        style={{ top: "25%"}}
      />
      <Handle 
        type="source"
        position="right"
        style={{ top: "75%" }}
      />
    </div>
  )
}

const nodeTypes = {
  TEXT: TextNode
}

const ReactFlowine = (props) => {
  const [fl, setFl] = useState({});
  const [nl, setNl] = useState({});

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)), []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)), []
  );

  const onConnect = (params) => {
    params.id = "w";
    setEdges((els) => addEdge(params, els));
  };

  useEffect(() => {
    flowine.init();
    setFl(flowine);
    if (!props.nl) setNl(FLOWINE_NODELIBRARY_);
    else setNl(props.nl);
  }, []);

  useEffect(() => {
    props.onFlowineChange(fl);
  }, [fl]);

  useEffect(() => {
    flowine.openCanvas(props.canvas); setFl(flowine);
    setNodes(transformFlowineNodes(props.canvas));
    setEdges(transformFlowineEdges(props.canvas))
  }, [props.canvas]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Background variant="dots" gap={10} size={1} color="#c8c8c8" />
      <MiniMap
        nodeColor={(node) => {
          switch (node.type) {
            case "rectangle":
              return "red";
            case "circle":
              return "#00ff00";
            case "triangle":
              return "rgb(0,0,255)";
            default:
              return "#eee";
          }
        }}
      />
      <Controls />
    </ReactFlow>
  )
}

export default ReactFlowine;
