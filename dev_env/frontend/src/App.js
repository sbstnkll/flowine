import React, { useEffect, useState } from "react";

import ReactJson from 'react-json-view'

import flowine from "flowine";

const canvasExample = {
  "id": 1,
  "header": {
    "canvasName": "MyCanvas",
    "creationDate": "YYYY-MM-DD"
  },
  "body": {
    "nodes": [
			{
				"id": "340448a3-f42c-4d33-90cb-719f24093668",
				"type": "TEXT",
				"nodeType": "INPUT",
				"caption": "Text",
				"inputPorts": [
					{
						"id": "340448a3-f42c-4d33-90cb-719f24093668_i_1",
						"ioType": "INPUT",
						"dataType": "TEXT",
						"holderNodeId": "340448a3-f42c-4d33-90cb-719f24093668",
						"portState": {
							"connectedPorts": [],
							"data": {
								"dataType": "TEXT",
								"data": null
							}
						},
						"visible": false
					}
				],
				"outputPorts": [
					{
						"id": "340448a3-f42c-4d33-90cb-719f24093668_o_1",
						"ioType": "OUTPUT",
						"dataType": "TEXT",
						"holderNodeId": "340448a3-f42c-4d33-90cb-719f24093668",
						"portState": {
							"connectedPorts": [],
							"data": {
								"dataType": "TEXT",
								"data": null
							}
						},
						"visible": true
					}
				],
				"actionFunction": {
					"language": "JavaScript",
					"code": "(function textNode() { opdArray_[0] = ipdArray_[0]; return opdArray_; })();"
				},
				"nodeState": {
					"state": "01",
					"debugMessage": "this node is new. no data. no connections."
				}
			},
			{
				"id": "72940d70-3420-445a-aed6-49d9c416f710",
				"type": "UPPERCASE",
				"nodeType": "PRIMITIVE",
				"caption": "Uppercase",
				"inputPorts": [
					{
						"id": "72940d70-3420-445a-aed6-49d9c416f710_i_1",
						"ioType": "INPUT",
						"dataType": "TEXT",
						"holderNodeId": "72940d70-3420-445a-aed6-49d9c416f710",
						"portState": {
							"connectedPorts": [],
							"data": {
								"dataType": "TEXT",
								"data": null
							}
						},
						"visible": true
					}
				],
				"outputPorts": [
					{
						"id": "72940d70-3420-445a-aed6-49d9c416f710_o_1",
						"ioType": "OUTPUT",
						"dataType": "TEXT",
						"holderNodeId": "72940d70-3420-445a-aed6-49d9c416f710",
						"portState": {
							"connectedPorts": [],
							"data": {
								"dataType": "TEXT",
								"data": null
							}
						},
						"visible": true
					}
				],
				"actionFunction": {
					"language": "JavaScript",
					"code": "(function uppercaseNode() { opdArray_[0] = ipdArray_[0].toUpperCase(); return opdArray_; })();"
				},
				"nodeState": {
					"state": "01",
					"debugMessage": "this node is new. no data. no connections."
				}
			}
		],
    "edges": []
  }
}

function App() {
  const [fl, setFl] = useState({});

	const setFlowineState = flowineObject => {
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

	const onButtonClick_openCanvas = e => {
		setFlowineState(flowine.openCanvas(canvasExample));
  }

  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <div>
        <button onClick={onButtonClick_init}>init</button>
        <button onClick={onButtonClick_createCanvas}>createCanvas</button>
				<button onClick={onButtonClick_createNode}>createNode</button>
				<button onClick={onButtonClick_openCanvas}>openCanvas</button>
      </div>
      <div>
        <ReactJson src={fl} />
      </div>
    </div>
  );
}

export default App;
