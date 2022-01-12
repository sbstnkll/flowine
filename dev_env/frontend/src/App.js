import React, { useEffect, useState } from "react";

import ReactJson from 'react-json-view'

import flowine from "flowine";

import canvasExample from "./sampledata/canvas";

function App() {
  const [fl, setFl] = useState({});

	const setFlowineState = flowineObject => {
		console.log(flowineObject);
		if (flowineObject.result !== "error") return setFl(flowine);
		else setFl(fl);
	}

  const onButtonClick_init = e => {
    setFlowineState(flowine.init());
  }

  const onButtonClick_createCanvas = e => {
		setFlowineState(flowine.createCanvas("MyCanvas"));
  }

	const onButtonClick_createNode = e => {
		setFlowineState(flowine.createNode("UPPERCASE"));
  }

	const onButtonClick_createEdge = e => {
		setFlowineState(flowine.createEdge(
			"340448a3-f42c-4d33-90cb-719f24093668_o_1",
			"72940d70-3420-445a-aed6-49d9c416f710_i_1" 
		));
  }

	const onButtonClick_openCanvas = e => {
		setFlowineState(flowine.openCanvas(canvasExample));
  }

	const onButtonClick_runNode = e => {
		setFlowineState(flowine.runNode("340448a3-f42c-4d33-90cb-719f24093668"));
  }

  const onButtonClick_solveGraph = e => {
		setFlowineState(flowine.solveGraph());
  }

  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <div>
        <button onClick={onButtonClick_init}>init</button>
        <button onClick={onButtonClick_createCanvas}>createCanvas</button>
				<button onClick={onButtonClick_createNode}>createNode</button>
				<button onClick={onButtonClick_createEdge}>createEdge</button>
				<button onClick={onButtonClick_openCanvas}>openCanvas</button>
				<button onClick={onButtonClick_runNode}>runNode</button>
        <button onClick={onButtonClick_solveGraph}>solveGraph</button>
			</div>
      <div>
        <ReactJson src={fl} />
      </div>
    </div>
  );
}

export default App;
