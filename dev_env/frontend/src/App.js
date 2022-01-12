// * CSS:
import './App.css';

import React, { useEffect, useState } from "react";

import ReactJson from 'react-json-view';


import canvasExample from "./sampledata/canvas";

import ReactFlowine, { onButtonClick_init, onButtonClick_createCanvas, onButtonClick_createNode,
  onButtonClick_createEdge, onButtonClick_openCanvas, onButtonClick_runNode, onButtonClick_solveGraph } from "./components/ReactFlowine";

function App() {
  return (
    <div className="page">
      <div className="content">
        <div className="top">
          <ReactFlowine canvas={canvasExample} />
        </div>
        <div className="bottom">
          <div className="bottom-buttons">
            <button onClick={onButtonClick_init}>init</button>
            <button onClick={onButtonClick_createCanvas}>createCanvas</button>
            <button onClick={onButtonClick_createNode}>createNode</button>
            <button onClick={onButtonClick_createEdge}>createEdge</button>
            <button onClick={onButtonClick_openCanvas}>openCanvas</button>
            <button onClick={onButtonClick_runNode}>runNode</button>
            <button onClick={onButtonClick_solveGraph}>solveGraph</button>
          </div>
          <div className="bottom-reactjson">
            <ReactJson src={fl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
