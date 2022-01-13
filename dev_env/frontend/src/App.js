// * CSS:
import './App.css';

import React, { useEffect, useState } from "react";

import ReactJson from 'react-json-view';

import ReactFlowine from './components/ReactFlowine';

import canvas1 from "./sampledata/canvas1";
import canvas2 from "./sampledata/canvas2";



function App() {
  const [fl, setFl] = useState({});
  const [canvas, setCanvas] = useState({});
  const [nl, setNl] = useState({});

  const onFlowineChange = fl_ => {
    setFl(fl_);
  }

  const onCanvas1ButtonClick = e => {
    console.log("onCanvas1ButtonClick");
    setCanvas(canvas1);
  }

  const onCanvas2ButtonClick = e => {
    console.log("onCanvas2ButtonClick");
    setCanvas(canvas2);
  }

  return (
    <div className="page">
      <div className="content">
        <div className="top">
          <ReactFlowine canvas={canvas} onFlowineChange={onFlowineChange} />
        </div>
        <div className="bottom">
          <div className="bottom-buttons">
            <button onClick={onCanvas1ButtonClick}>Canvas1</button>
            <button onClick={onCanvas2ButtonClick}>Canvas2</button>
            {/* <button onClick={onButtonClick_init}>init</button>
            <button onClick={onButtonClick_createCanvas}>createCanvas</button>
            <button onClick={onButtonClick_createNode}>createNode</button>
            <button onClick={onButtonClick_createEdge}>createEdge</button>
            <button onClick={onButtonClick_openCanvas}>openCanvas</button>
            <button onClick={onButtonClick_runNode}>runNode</button>
            <button onClick={onButtonClick_solveGraph}>solveGraph</button> */}
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
