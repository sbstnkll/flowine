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

Development is best made inside the Development Environment `/dev_env`:

`docker build . -t dev_env -f dev_env/Dockerfile`  
`docker run -it --rm --name dev_env -p 127.0.0.1:8000:8000/tcp -v ${PWD}:/dev_env dev_env`  
`cd /dev_env/src && npm i`  
`cd /dev_env/dev_env && npm i && npm run dev`  

Example `/example`:  

`docker build . -t example -f example/Dockerfile`  
`docker run -it --rm --name example -p 127.0.0.1:8000:8000/tcp -v ${PWD}:/example example`  
`cd /example/src && npm i`  
`cd /example/example && npm i && npm run dev`  

### Support or Contact

flowine is maintained by Sebastian Kulle (github.com/sbstnkll)
