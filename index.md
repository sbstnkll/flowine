## Documentation

flowine.js is an open source engine for flow based programming. It is written in JavaScript.

### Installation

`npm i flowine`

### Usage

`import flowine from "flowine"`

(This is a ES module. You can also use it with Node.js, but have to add the following line to your package.json: `"type": "module"`)

### Introduction

- Initializes flowine: `flowine.init()`
- Terminates flowine: `flowine.terminate()`
- Get the status of flowine: `flowine.status()`
- Create a blank new canvas: `flowine.createCanvas(canvasName)`
- Delete the canvas: `flowine.deleteCanvas()`
- Create a new node: `flowine.createNode(nodeType)`
- Set the port data of a node: `flowine.setPortData(id, data)`
- Delete a node: `flowine.deleteNode(id)`
- Create a edge: `flowine.createEdge(sourcePortId, targetPortId)`
- Update a edge: `flowine.updateEdge(id, sourcePortId, targetPortId)`
- Delete a edge: `flowine.deleteEdge(id)`
- Save the canvas as a JSON file: `flowine.saveCanvasAsJSON(fileName)`
- Open a canvas from a JSON file: `flowine.openCanvasFromJSON(fileName)` 
- Run (Execute) a node: `flowine.runNode(id)`
- Solve (Execute) the whole graph: `flowine.solveGraph()`

### Development

The core library consists of just 3 files:
- `flowine.js` This is the main library width all classes and functions
- `config.js` This is the configuration file that is used by flowine.js
- `nodelibrary.js` This is the standard node-library that is loaded by default

### Support or Contact

flowine is maintained by Sebastian Kulle (github.com/sbstnkll)
