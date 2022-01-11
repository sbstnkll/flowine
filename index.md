## Documentation

flowine.js is an open source engine for flow based programming. It is written in JavaScript.

### Installation

`npm i flowine`

### Usage

`import flowine from "flowine"`

(This is a ES module. You can also use it with Node.js, but have to add the following line to your package.json: `"type": "module"`)

### Introduction

#### Available Methods:
```js
flowine.init() // Initializes flowine 
flowine.terminate() // Terminates flowine
flowine.status() // Get the status of flowine
flowine.createCanvas(canvasName) // Create a blank new canvas
flowine.deleteCanvas() // Delete the canvas
flowine.createNode(nodeType) // Create a new node
flowine.setPortData(id, data) // Set the port data of a node
flowine.deleteNode(id) // Delete a node
flowine.createEdge(sourcePortId, targetPortId) // Create a edge
flowine.updateEdge(id, sourcePortId, targetPortId) // Update a edge
flowine.deleteEdge(id) // Delete a edge
flowine.saveCanvasAsJSON(fileName) // Save the canvas as a JSON file
flowine.openCanvasFromJSON(fileName) // Open a canvas from a JSON file
flowine.runNode(id) // Run (Execute) a node
flowine.solveGraph() // Solve (Execute) the whole graph
```

#### Execution of Code:
Every node has a `actionFunction`. This can be JavaScript- or Python-Code. At the moment both can only be executed in a Node.js serverside environment. However in the future it will be possible toexecute JavaScript Code on the client-side.

Example of a JavaScript `actionFunction`:
```json
"actionFunction": {
  "language": "JavaScript",
  "code": "(function uppercaseNode() { opdArray_[0] = ipdArray_[0].toUpperCase(); return opdArray_; })();"
}
```

Example of a Python `actionFunction`:
> ⚠️ Running Pythoncode is still in very early development. Use it with caution.
```json
"UPPERCASE_PYTHON": {
  "nodeType": "PRIMITIVE",
  "caption": "UppercasePython",
  "inputPorts": [
    {
      "type": "TEXT",
      "visible": true
    }
  ],
  "outputPorts": [
    {
      "type": "TEXT",
      "visible": true
    }
  ],
  "actionFunction": {
    "language": "Python",
    "code": "import sys\nimport json\nimport os\nstdinArray_ = sys.stdin.readline().split(\",\")\nipdArray_ = []\nfor e in stdinArray_:\n\tipdArray_.append(e.strip().strip(\"[\").strip(\"]]\").strip(\"\\\\\"\"))\nopdArray_ = []\nopdArray_.append(ipdArray[0].upper())\nprint(json.dumps(opdArray_))"
  }
}
```

#### The structure of a Canvas
This is an empty Canvas with a Name, a creation Date and no Nodes and no Edges:
```json
{
  "id": 1,
  "header": {
    "canvasName": "MyCanvas",
    "creationDate": "YYYY-MM-DD"
  },
  "body": {
    "nodes": [],
    "edges": []
  }
}
```

#### The structure of a Node
This Node reads TEXT from the Input-Port and transforms it to uppercase-TEXT that will be send to the Output-Port:
```json
"UPPERCASE": {  
  "nodeType": "PRIMITIVE",  
  "caption": "Uppercase",  
  "inputPorts": [  
    {  
      "type": "TEXT",  
      "visible": true  
    }  
  ],  
  "outputPorts": [  
    {  
      "type": "TEXT",  
      "visible": true  
    }  
  ],  
  "actionFunction": {  
    "language": "JavaScript",  
    "code": "(function uppercaseNode() { opdArray_[0] = ipdArray_[0].toUpperCase(); return opdArray_; })();"  
  }
}
```
The Nodes are stored in the file `nodelibrary.js`. You can add your own custom nodes to this file.

### Development

The core library consists of just 3 files:
- `flowine.js` This is the main library width all classes and functions
- `config.js` This is the configuration file that is used by flowine.js
- `nodelibrary.js` This is the standard node-library that is loaded by default

Run the following commands from the root folder and the use the `dev`folder to develop:

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
