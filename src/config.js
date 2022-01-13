"use strict";

export default {
  "errorResult": "error",
  "successResult": "success",
  "debugMsg": {
    "init": {
      "success": "flowine initialized.",
      "error": "error. flowine already initialized."
    },
    "terminate": {
      "success": "flowine terminated.",
      "noInitError": "error. flowine not initialized."
    },
    "status": "flowine status:",
    "createCanvas": {
      "success": "canvas created.",
      "noInitError": "error. flowine not initialized."
    },
    "deleteCanvas": {
      "success": "canvas deleted.",
      "error": "error. flowine not initialized or no canvas created."
    },
    "createNode": {
      "success": "node created.",
      "noInitError": "error. flowine not initialized.",
      "noCanvasError": "error. no canvas. create a canvas to create nodes.",
      "error": "error."
    },
    "deleteNode": {
      "success": "node deleted.",
      "error": "error.",
      "errorNoNode": "error. the specified node id doesn't exist."
    },
    "createEdge": {
      "success": "edge created.",
      "noInitError": "error. flowine not initialized.",
      "noCanvasError": "error. no canvas. create a canvas to create edges.",
      "noSourcePortExistsError": "error. sourceport doesn't exist.",
      "noTargetPortExistsError": "error. targetport doesn't exist.",
      "sourcePortAlreadyConnectedError": "error. source port already connected.",
      "targetPortAlreadyConnectedError": "error. target port already connected."
    },
    "updateEdge": {
      "success": "edge updated.",
      "error": "error.",
      "errorNoEdge": "error. the specified edge id doesn't exist."
    },
    "deleteEdge": {
      "success": "edge deleted.",
      "error": "error.",
      "errorNoEdge": "error. the specified edge id doesn't exist."
    },
    "saveCanvasAsJSON": {
      "success": "canvas saved as JSON file.",
      "error": "error. flowine not initialized or no canvas created."
    },
    "openCanvasFromJSON": {
      "success": "canvas opened from JSON file.",
      "error": "error."
    },
    "openCanvas": {
      "success": "canvas opened.",
      "error": "error. openCanvas."
    },
    "runNode": {
      "success": "runNode successfull",
      "error": "error."
    }
  }
}