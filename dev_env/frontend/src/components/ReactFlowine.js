import React, { useState, useEffect, useRef, useMemo } from "react";

import ReactFlow, { removeElements, updateEdge, MiniMap, Controls, Background
} from "react-flow-renderer";

import flowine from "flowine";

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
  /* if (flowineObject.result !== "error") return setFl(flowine);
  else setFl(fl); */
  
}

const ReactFlowine = (props) => {
  const [fl, setFl] = useState({});



  const [elements, setElements] = useState([]);
  const [instance, setInstance] = useState();
  const [nodeTypes, setNodeTypes] = useState({});

  /**
   * handleReactFlow_onLoad - handles the initial load of reactflow
   * @param {*} reactFlowInstance 
   */
  const handleReactFlow_onLoad = (reactFlowInstance) => {
    setInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  }

  useEffect(() => {
    console.log("fl");
  }, [props.fl]);

  useEffect(() => {
    console.log("fl.canvas");
  }, [props.fl.canvas?.body]);

  return (
    <ReactFlow
      elements={elements}
      /* onElementsRemove={handleReactFlow_deleteElement} */
      /* onConnect={handleReactFlow_connect} */
      deleteKeyCode={8 || 46}
      /* onEdgeUpdate={handleReactFlow_updateEdge} */
      nodeTypes={nodeTypes}
      /* snapToGrid={true}
        snapGrid={[16, 16]} */
      connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
      /* onNodeDoubleClick={(e, node) => {
        handleReactFlow_doubleClick(e, node);
      }} */
      /* onPaneContextMenu={handleReactFlow_onPaneContextMenu} */
      onLoad={handleReactFlow_onLoad}
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
