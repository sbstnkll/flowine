"use strict";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { promisify } from "util";

//* CONFIGURATION
//* -------------
// config file, storing values for debug-mode, etc.
import FLOWINE_CONFIG from "./config.js";
// nodelibrary, stores all available nodes (node-types)
import FLOWINE_NODELIBRARY from "./nodelibrary.js";

const FLOWINE_CONFIG_ = {
    "debugMsg": "flowine config loaded.",
    "result": FLOWINE_CONFIG
}

const FLOWINE_NODELIBRARY_ = {
  "debugMsg": "flowine nodelibrary loaded.",
  "result": FLOWINE_NODELIBRARY
}

var debugMessages = true;

//* CLASSES
//* -------
/**
 * Flowine
 */
class Flowine {
  /**
   * constructor - the constructor of the flowine object
   */
  constructor() {
    this.reset();
  }

  /**
   * reset - resets the flowine object to a blank status
   */
  reset() {
    this.id = undefined;
    this.isRunning = false;
    this.canvas = undefined;
  }

  /**
   * init - initializes the flowine object
   * @param {*} id - the id of the flowine object
   * @returns - returns the id of the created flowine object
   */
  init(debugMessages_ = true) {
    // TODO: possibility of multiple flowine objects? multi-user? user id?
    debugMessages = debugMessages_;
    if (this.isRunning === false) {
      var id = 1;
      this.id = id;
      this.isRunning = true;
      debugMsg(FLOWINE_CONFIG.debugMsg.init.success);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.init.success,
        "result": this
      };
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.init.error);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.init.error,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * terminate - stops flowine
   * @returns - debug message (successfull/error)
   */
  terminate() {
    if (this.isRunning) {
      this.reset();
      debugMsg(FLOWINE_CONFIG.debugMsg.terminate.success);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.terminate.success,
        "result": this
      };
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.terminate.noInitError);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.terminate.noInitError,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * status - get's/logs the status of the flowine-object
   * @returns - returns the flowine object itself
   */
  status() {
    debugMsg(FLOWINE_CONFIG.debugMsg.status);
    //debugMsg(flowine);
    console.dir(this);
    //if (this.canvas.body.nodes) console.log("Number of nodes:", this.canvas.body.nodes.length, "Number of edges:", this.canvas.body.edges.length)
    //debugMsg(Flowine);
    return this;
  }

  /**
   * createCanvas - creates a new canvas
   * @param {*} id - the id of the canvas (atm only 1 is possible)
   * @param {string} name - the name of the canvas
   * @returns
   */
  createCanvas(name, id = 1) {
    // TODO: possibility of multiple canvas? increment the id
    // TODO: get the current date
    var creationDate = "XXXX-XX-XX";
    var initialNodes = [];
    var initialEdges = [];
    if (this.isRunning) {
      this.canvas = {};
      var newCanvasHeader = new CanvasHeader(name, creationDate);
      var newCanvasBody = new CanvasBody(initialNodes, initialEdges);
      var newCanvas = new Canvas(id, newCanvasHeader, newCanvasBody);
      this.canvas = newCanvas;
      debugMsg(FLOWINE_CONFIG.debugMsg.createCanvas.success);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.createCanvas.success,
        "result": this.canvas
      };
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.createCanvas.noInitError);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.createCanvas.noInitError,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * deleteCanvas - deletes the canvas with the corresponding id
   * @param {*} id - the canvas id (atm only 1 is possible)
   */
  deleteCanvas(id = 1) {
    if (this.isRunning) {
      if (this.canvas != undefined) {
        delete this.canvas;
        debugMsg(FLOWINE_CONFIG.debugMsg.deleteCanvas.success);
        return FLOWINE_CONFIG.debugMsg.deleteCanvas.success;
      } else {
        debugMsg(FLOWINE_CONFIG.debugMsg.deleteCanvas.error);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.deleteCanvas.error,
          "result": FLOWINE_CONFIG.errorResult
        };
      }
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.deleteCanvas.error);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.deleteCanvas.error,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * createNode - creates a new node on the canvas
   * @param {string} type - the node-type
   * @returns
   */
  createNode(type) {
    if (this.isRunning) {
      if (this.canvas != undefined) {
        try {
          var newNode = new Node(
            null,
            type,
            null,
            null,
            null,
            null,
            null,
            null
          );
          this.canvas.body.nodes.push(newNode);
          debugMsg(FLOWINE_CONFIG.debugMsg.createNode.success);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.success,
            "result": newNode
          };
        } catch (error) {
          console.log(error);
          debugMsg(FLOWINE_CONFIG.debugMsg.createNode.error);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.error,
            "result": FLOWINE_CONFIG.errorResult
          };
        }
      } else {
        debugMsg(FLOWINE_CONFIG.debugMsg.createNode.noCanvasError);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.noCanvasError,
          "result": FLOWINE_CONFIG.errorResult
        };
      }
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.createNode.noInitError);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.noInitError,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  createNode_fromDefinition(
    id,
    type,
    nodeType,
    caption,
    inputPorts,
    outputPorts,
    actionFunction,
    nodeState
  ) {
    if (this.isRunning) {
      if (this.canvas != undefined) {
        var newNode = new Node(
          id,
          type,
          nodeType,
          caption,
          inputPorts,
          outputPorts,
          actionFunction,
          nodeState
        );
        this.canvas.body.nodes.push(newNode);
        debugMsg(FLOWINE_CONFIG.debugMsg.createNode.success);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.success,
          "result": FLOWINE_CONFIG.successResult
        };
      } else {
        debugMsg(FLOWINE_CONFIG.debugMsg.createNode.noCanvasError);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.noCanvasError,
          "result": FLOWINE_CONFIG.errorResult
        };
      }
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.createNode.noInitError);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.createNode.noInitError,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * deleteNode - deletes the specified node from the canvas
   * @param {*} id - the id of the node
   */
  deleteNode(id) {
    switch (this.isRunning) {
      case true:
        // flowine is running:
        if (this.canvas != undefined) {
          // canvas exists:
          if (this.canvas.body.nodes.some((nodes) => nodes.id === id)) {
            // node exists:
            this.canvas.body.nodes.map((e, i) => {
              if (e.id === id) {
                // find all connected edges and delete them:
                var edgesToDelete_ = [];
                e.inputPorts.map((e_, i_) => {
                  this.canvas.body.edges.map((e__, i__) => {
                    if (e__.targetPortId === e_.id) {
                      edgesToDelete_.push(e__.id);
                    }
                  })
                })
                e.outputPorts.map((e_, i_) => {
                  this.canvas.body.edges.map((e__, i__) => {
                    if (e__.sourcePortId === e_.id) {
                      edgesToDelete_.push(e__.id);
                    }
                  })
                })
                edgesToDelete_.map((e_, i) => {
                  //console.log(e_)
                  this.deleteEdge(e_);
                })
                // delete the node:
                this.canvas.body.nodes.splice(i, 1);
                // show success message:
                debugMsg(FLOWINE_CONFIG.debugMsg.deleteNode.success);
              }
            });
            return {
              "debugMsg": FLOWINE_CONFIG.debugMsg.deleteNode.success,
              "result": FLOWINE_CONFIG.successResult
            };
          } else {
            // node doesn't exist:
            debugMsg(FLOWINE_CONFIG.debugMsg.deleteNode.errorNoNode);
            return {
              "debugMsg": FLOWINE_CONFIG.debugMsg.deleteNode.errorNoNode,
              "result": FLOWINE_CONFIG.errorResult
            };
          }
        } else {
          // canvas doesn't exist:
          debugMsg(FLOWINE_CONFIG.debugMsg.deleteNode.error);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.deleteNode.error,
            "result": FLOWINE_CONFIG.errorResult
          };
        }
      default:
        // flowine isn't running:
        debugMsg(FLOWINE_CONFIG.debugMsg.deleteNode.error);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.deleteNode.error,
          "result": FLOWINE_CONFIG.errorResult
        };
    }
  }

  /**
   * createEdge - creates a new edge between the defined sourcePort & targetPort
   * @param {*} sourcePortId - the id of the sourcePort (outputPort of a node)
   * @param {*} targetPortId - the id of the targetPort (inputPort of a node)
   * @returns
   */
  createEdge(
    sourcePortId,
    targetPortId,
    ifTargetPortAlreadyConnected_addInputPort = false
  ) {
    if (this.isRunning) {
      // flowine is running:
      if (this.canvas != undefined) {
        // canvas exists:
        var sourcePortExists = false;
        var targetPortExists = false;
        var sourceNodeIndex, targetNodeIndex, sourcePortIndex, targetPortIndex;
        var sourcePortAlreadyConnected = false;
        var targetPortAlreadyConnected = false;
        var sourceNodeId_;
        this.canvas.body.nodes.map((e, i) => {
          // check if the target port exists:
          e.inputPorts.map((e_, i_) => {
            switch (e_.id) {
              case targetPortId:
                targetPortExists = true;
                if (e_.portState.connectedPorts[0] !== undefined) {
                  targetPortAlreadyConnected = true;
                } else {
                  targetPortAlreadyConnected = false;
                }
                sourceNodeIndex = i;
                sourcePortIndex = i_;
                break;
              default:
                break;
            }
          });
          // check if the source port exists:
          e.outputPorts.map((e_, i_) => {
            switch (e_.id) {
              case sourcePortId:
                sourcePortExists = true;
                sourceNodeId_ = e.id;
                targetNodeIndex = i;
                targetPortIndex = i_;
                break;
              default:
                break;
            }
          });
        });
        // check if both ports exist:
        switch (sourcePortExists && targetPortExists) {
          case true:
            // both ports exist:
            if (sourcePortAlreadyConnected || targetPortAlreadyConnected) {
              var returnArray_ = [];
              // one or both ports already connected:
              if (targetPortAlreadyConnected) {
                // target port connected, throw an error:
                if (ifTargetPortAlreadyConnected_addInputPort) {
                  // do something different in the future?
                  debugMsg(
                    FLOWINE_CONFIG.debugMsg.createEdge
                      .targetPortAlreadyConnectedError
                  );
                  returnArray_.push(
                    FLOWINE_CONFIG.debugMsg.createEdge
                      .targetPortAlreadyConnectedError
                  );
                } else {
                  debugMsg(
                    FLOWINE_CONFIG.debugMsg.createEdge
                      .targetPortAlreadyConnectedError
                  );
                  returnArray_.push(
                    FLOWINE_CONFIG.debugMsg.createEdge
                      .targetPortAlreadyConnectedError
                  );
                }
              }
              return {
                "debugMsg": returnArray_,
                "result": FLOWINE_CONFIG.errorResult
              };
            } else {
              // the targetport isnt connected
              // if the source port is already connected, that doesn't matter
              // outputports (here the sourceport) can have multiple edges 
              // attached:
              // create the edge:
              var newEdge = new Edge(null, sourcePortId, targetPortId);
              this.canvas.body.edges.push(newEdge);
              // add the connected port to the portstate connectedports:
              this.getPortObjectById(sourcePortId).portState.addConnectedPort(
                targetPortId
              );
              this.getPortObjectById(targetPortId).portState.addConnectedPort(
                sourcePortId
              );
              // show success message:
              debugMsg(FLOWINE_CONFIG.debugMsg.createEdge.success);
              return {
                "debugMsg": FLOWINE_CONFIG.debugMsg.createEdge.success,
                "result": newEdge
              };
            }
          default:
            var returnArray_ = [];
            if (sourcePortExists === false) {
              debugMsg(
                FLOWINE_CONFIG.debugMsg.createEdge.noSourcePortExistsError
              );
              returnArray_.push(
                FLOWINE_CONFIG.debugMsg.createEdge.noSourcePortExistsError
              );
            }
            if (targetPortExists === false) {
              debugMsg(
                FLOWINE_CONFIG.debugMsg.createEdge.noTargetPortExistsError
              );
              returnArray_.push(
                FLOWINE_CONFIG.debugMsg.createEdge.noTargetPortExistsError
              );
            }
            return {
              "debugMsg": returnArray_,
              "result": FLOWINE_CONFIG.errorResult
            };
        }
      } else {
        debugMsg(FLOWINE_CONFIG.debugMsg.createEdge.noCanvasError);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.createEdge.noCanvasError,
          "result": FLOWINE_CONFIG.errorResult
        };
      }
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.createEdge.noInitError);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.createEdge.noInitError,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  createEdge_fromDefinition(id, sourcePortId, targetPortId) {
    if (this.isRunning) {
      // flowine is running:
      if (this.canvas != undefined) {
        // canvas exists:
        var newEdge = new Edge(id, sourcePortId, targetPortId);
        this.canvas.body.edges.push(newEdge);
        debugMsg(FLOWINE_CONFIG.debugMsg.createEdge.success);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.createEdge.success,
          "result": newEdge
        };
      } else {
        debugMsg(FLOWINE_CONFIG.debugMsg.createEdge.noCanvasError);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.createEdge.noCanvasError,
          "result": FLOWINE_CONFIG.errorResult
        };
      }
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.createEdge.noInitError);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.createEdge.noInitError,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * updateEdge - updates the specified edge
   * @param {*} id - the id of the edge
   * @param {*} sourcePortId - the new source port id
   * @param {*} targetPortId - the new target port id
   * @returns - debug message
   */
  updateEdge(id, sourcePortId, targetPortId) {
    switch (this.isRunning) {
      case true:
        // flowine is running:
        if (this.canvas != undefined) {
          // canvas exists:
          if (this.canvas.body.edges.some((edges) => edges.id === id)) {
            // edge exists:
            var oldSourcePortId_, oldTargetPortId_;
            oldSourcePortId_ = this.getEdgeObjectById(id).sourcePortId;
            oldTargetPortId_ = this.getEdgeObjectById(id).targetPortId;
            this.canvas.body.edges.map((e, i) => {
              if (e.id === id) {
                // ports are the same:
                if ((oldSourcePortId_ === sourcePortId) && (oldTargetPortId_ === targetPortId)) {
                  //console.log("1")
                  debugMsg(FLOWINE_CONFIG.debugMsg.updateEdge.error);
                  return {
                    "debugMsg": FLOWINE_CONFIG.debugMsg.updateEdge.error,
                    "result": FLOWINE_CONFIG.errorResult
                  };
                }
                // sourceport same and targetport new:
                if ((oldSourcePortId_ === sourcePortId) && (oldTargetPortId_ !== targetPortId)) {
                  // delete the old targetport from the sourceport connectedports:
                  this.getPortObjectById(
                    sourcePortId).portState.connectedPorts.splice(
                      this.getPortObjectById(
                        sourcePortId).portState.connectedPorts.indexOf(
                          oldTargetPortId_
                        ), 1
                    );
                  // delete the sourceport from the old targetport connectedports:
                  this.getPortObjectById(
                    oldTargetPortId_).portState.connectedPorts.splice(
                      this.getPortObjectById(
                        oldTargetPortId_).portState.connectedPorts.indexOf(
                          sourcePortId
                        ), 1
                    );
                  // add the new targetport to the sourceport connectedports:
                  this.getPortObjectById(
                    sourcePortId).portState.connectedPorts.push(
                      targetPortId
                    );
                  // add the sourceport to the new targetport connectedports:
                  this.getPortObjectById(
                    targetPortId).portState.connectedPorts.push(
                      sourcePortId
                    );
                  // set the old target port data to null:
                  this.getPortObjectById(
                    oldTargetPortId_).portState.data.data = null;
                }
                // sourceport new and targetport same:
                if ((oldSourcePortId_ !== sourcePortId) && (oldTargetPortId_ === targetPortId)) {
                  // delete the old sourceort from the targetport connectedports:
                  this.getPortObjectById(
                    targetPortId).portState.connectedPorts.splice(
                      this.getPortObjectById(
                        targetPortId).portState.connectedPorts.indexOf(
                          oldSourcePortId_
                        ), 1
                    );
                  // delete the targetport from the old sourceport connectedports:
                  this.getPortObjectById(
                    oldSourcePortId_).portState.connectedPorts.splice(
                      this.getPortObjectById(
                        oldSourcePortId_).portState.connectedPorts.indexOf(
                          targetPortId
                        ), 1
                    );
                  // add the new sourceport to the targetport connectedports:
                  this.getPortObjectById(
                    targetPortId).portState.connectedPorts.push(
                      sourcePortId
                    );
                  // add the targetport to the new sourceport connectedports:
                  this.getPortObjectById(
                    sourcePortId).portState.connectedPorts.push(
                      targetPortId
                    );
                }
                // both ports new:
                if ((oldSourcePortId_ !== sourcePortId) && (oldTargetPortId_ !== targetPortId)) {
                  // TODO - not critical - this constellation is likely rare
                }
                // update the edge:
                this.canvas.body.edges[i].sourcePortId = sourcePortId;
                this.canvas.body.edges[i].targetPortId = targetPortId;
                debugMsg(FLOWINE_CONFIG.debugMsg.updateEdge.success);
              }
            });
            return {
              "debugMsg": FLOWINE_CONFIG.debugMsg.updateEdge.success,
              "result": FLOWINE_CONFIG.successResult
            };
          } else {
            // edge doesn't exist:
            debugMsg(FLOWINE_CONFIG.debugMsg.updateEdge.errorNoEdge);
            return {
              "debugMsg": FLOWINE_CONFIG.debugMsg.updateEdge.errorNoEdge,
              "result": FLOWINE_CONFIG.errorResult
            };
          }
        } else {
          // canvas doesn't exist:
          debugMsg(FLOWINE_CONFIG.debugMsg.updateEdge.error);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.updateEdge.error,
            "result": FLOWINE_CONFIG.errorResult
          };
        }
      default:
        // flowine isn't running:
        debugMsg(FLOWINE_CONFIG.debugMsg.updateEdge.error);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.updateEdge.error,
          "result": FLOWINE_CONFIG.errorResult
        };
    }
  }

  /**
   * deleteEdge - deletes the specified edge from the canvas
   * @param {*} id - the id of the edge
   * @returns - debug message
   */
  deleteEdge(id) {
    switch (this.isRunning) {
      case true:
        // flowine is running:
        if (this.canvas != undefined) {
          // canvas exists:
          if (this.canvas.body.edges.some((edges) => edges.id === id)) {
            // edge exists:
            this.canvas.body.edges.map((e, i) => {
              if (e.id === id) {
                // find the sourceport and update the portstate connectedports:
                this.getPortObjectById(
                  e.sourcePortId).portState.connectedPorts.splice(
                    this.getPortObjectById(
                      e.sourcePortId).portState.connectedPorts.indexOf(
                        e.targetPortId
                      ), 1
                  );
                // find the targetport and update the portstate connectedports:
                this.getPortObjectById(
                  e.targetPortId).portState.connectedPorts.splice(
                    this.getPortObjectById(
                      e.targetPortId).portState.connectedPorts.indexOf(
                        e.sourcePortId
                      ), 1
                  );
                // find the targetport and update the portstate data (set it to null):
                this.getPortObjectById(
                  e.targetPortId).portState.data.data = null;
                // delete the edge:
                this.canvas.body.edges.splice(i, 1);
                debugMsg(FLOWINE_CONFIG.debugMsg.deleteEdge.success);
              }
            });
            return {
              "debugMsg": FLOWINE_CONFIG.debugMsg.deleteEdge.success,
              "result": FLOWINE_CONFIG.successResult
            };
          } else {
            // edge doesn't exist:
            debugMsg(FLOWINE_CONFIG.debugMsg.deleteEdge.errorNoEdge);
            return {
              "debugMsg": FLOWINE_CONFIG.debugMsg.deleteEdge.errorNoEdge,
              "result": FLOWINE_CONFIG.errorResult
            };
          }
        } else {
          // canvas doesn't exist:
          debugMsg(FLOWINE_CONFIG.debugMsg.deleteEdge.error);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.deleteEdge.error,
            "result": FLOWINE_CONFIG.errorResult
          };
        }
      default:
        // flowine isn't running:
        debugMsg(FLOWINE_CONFIG.debugMsg.deleteEdge.error);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.deleteEdge.error,
          "result": FLOWINE_CONFIG.errorResult
        };
    }
  }

  /**
   * saveCanvasAsJSON - saves the canvas to a JSON file
   * @param {*} fileName - the filename for the JSON file (without <.json>)
   * @returns - debug message
   */
  saveCanvasAsJSON(fileName) {
    if (this.isRunning && this.canvas != undefined) {
      fs.writeFileSync(
        `${fileName}.json`,
        JSON.stringify(this.canvas, null, 4)
      );
      debugMsg(FLOWINE_CONFIG.debugMsg.saveCanvasAsJSON.success);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.saveCanvasAsJSON.success,
        "result": FLOWINE_CONFIG.successResult
      };
    } else {
      debugMsg(FLOWINE_CONFIG.debugMsg.saveCanvasAsJSON.error);
      return {
        "debugMsg": FLOWINE_CONFIG.debugMsg.saveCanvasAsJSON.error,
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  /**
   * openCanvasFromJSON - opens a canvas from a JSON file
   * @param {*} fileName - the file name of the JSON file (without <.json>)
   * @returns - debug message
   */
  openCanvasFromJSON(fileName) {
    var canvas_;
    switch (this.isRunning) {
      case true:
        // flowine is running:
        try {
          canvas_ = JSON.parse(fs.readFileSync(`${fileName}.json`));
          // create the canvas object:
          this.createCanvas(canvas_.header.canvasName);
          // create the nodes object(s):
          canvas_.body.nodes.map((e, i) => {
            var inputPortsArray_ = [];
            var outputPortsArray_ = [];
            e.inputPorts.map((e_, i_) => {
              var connectedPorts__, data__, dataType__;
              connectedPorts__ = e_.portState.connectedPorts;
              data__ = e_.portState.data.data;
              dataType__ = e_.portState.data.dataType;
              inputPortsArray_.push(
                new Port(
                  e_.id,
                  e_.ioType,
                  e_.dataType,
                  e_.holderNodeId,
                  new PortState(connectedPorts__, new DataToken(dataType__, data__)),
                  e_.visible
                )
              );
            });
            e.outputPorts.map((e_, i_) => {
              var connectedPorts__, data__, dataType__;
              connectedPorts__ = e_.portState.connectedPorts;
              data__ = e_.portState.data.data;
              dataType__ = e_.portState.data.dataType;
              outputPortsArray_.push(
                new Port(
                  e_.id,
                  e_.ioType,
                  e_.dataType,
                  e_.holderNodeId,
                  new PortState(connectedPorts__, new DataToken(dataType__, data__)),
                  e_.visible
                )
              );
            });
            this.createNode_fromDefinition(
              e.id,
              e.type,
              e.nodeType,
              e.caption,
              inputPortsArray_,
              outputPortsArray_,
              new ActionFunction(
                e.actionFunction.language,
                e.actionFunction.code),
              new NodeState(e.nodeState.state, e.nodeState.debugMessage)
            );
          });

          // create the edge object(s):
          canvas_.body.edges.map((e, i) => {
            this.createEdge_fromDefinition(
              e.id,
              e.sourcePortId,
              e.targetPortId
            );
          });
          debugMsg(FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.success);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.success,
            "result": FLOWINE_CONFIG.successResult
          };
        } catch (error) {
          console.log(error);
          debugMsg(FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.error);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.error,
            "result": FLOWINE_CONFIG.errorResult
          };
        }
      default:
        // flowine isn't running:
        debugMsg(FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.error);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.error,
          "result": FLOWINE_CONFIG.errorResult
        };
    }
  }

  openCanvas(canvasObject) {
    var canvas_;
    switch (this.isRunning) {
      case true:
        // flowine is running:
        try {
          canvas_ = canvasObject;
          // create the canvas object:
          this.createCanvas(canvas_.header.canvasName);
          // create the nodes object(s):
          canvas_.body.nodes.map((e, i) => {
            var inputPortsArray_ = [];
            var outputPortsArray_ = [];
            e.inputPorts.map((e_, i_) => {
              var connectedPorts__, data__, dataType__;
              connectedPorts__ = e_.portState.connectedPorts;
              data__ = e_.portState.data.data;
              dataType__ = e_.portState.data.dataType;
              inputPortsArray_.push(
                new Port(
                  e_.id,
                  e_.ioType,
                  e_.dataType,
                  e_.holderNodeId,
                  new PortState(connectedPorts__, new DataToken(dataType__, data__)),
                  e_.visible
                )
              );
            });
            e.outputPorts.map((e_, i_) => {
              var connectedPorts__, data__, dataType__;
              connectedPorts__ = e_.portState.connectedPorts;
              data__ = e_.portState.data.data;
              dataType__ = e_.portState.data.dataType;
              outputPortsArray_.push(
                new Port(
                  e_.id,
                  e_.ioType,
                  e_.dataType,
                  e_.holderNodeId,
                  new PortState(connectedPorts__, new DataToken(dataType__, data__)),
                  e_.visible
                )
              );
            });
            this.createNode_fromDefinition(
              e.id,
              e.type,
              e.nodeType,
              e.caption,
              inputPortsArray_,
              outputPortsArray_,
              new ActionFunction(
                e.actionFunction.language,
                e.actionFunction.code),
              new NodeState(e.nodeState.state, e.nodeState.debugMessage)
            );
          });

          // create the edge object(s):
          canvas_.body.edges.map((e, i) => {
            this.createEdge_fromDefinition(
              e.id,
              e.sourcePortId,
              e.targetPortId
            );
          });
          debugMsg(FLOWINE_CONFIG.debugMsg.openCanvas.success);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.openCanvas.success,
            "result": FLOWINE_CONFIG.successResult
          };
        } catch (error) {
          //console.log(error);
          debugMsg(FLOWINE_CONFIG.debugMsg.openCanvas.error);
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.openCanvas.error,
            "result": FLOWINE_CONFIG.errorResult
          };
        }
      default:
        // flowine isn't running:
        debugMsg(FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.error);
        return {
          "debugMsg": FLOWINE_CONFIG.debugMsg.openCanvasFromJSON.error,
          "result": FLOWINE_CONFIG.errorResult
        };
    }
  }

  /**
   * solveGraph
   */
  async solveGraph_async() {
    debugMsg("--- SOLVE-GRAPH START ---");
    debugMsg("-------------------------");

    var nodeSequence_ = [];

    // topological sorting of the nodes
    nodeSequence_ = this.getTopologicallySortedNodeIds();

    try {
      // * SOLVER CODE STARTS HERE
      for (let i = 0; i < nodeSequence_.length; i++) {
        var e = nodeSequence_[i];
        var nodeObject_ = this.getNodeObjectById(e);
        if (debugMessages)
          console.log(
            "Node ",
            i,
            ", ",
            nodeObject_.type,
            ", ",
            nodeObject_.nodeType,
            ", ",
            nodeObject_.id
          );
        // * run the node (asynchronously):
        await new Promise(next => {
          this.runNode(e, true).then(res_ => {
            next();
          });
        });
      }
      // * SOLVER CODE ENDS HERE
      debugMsg("solve graph successfull");
      debugMsg("-----------------------");
      debugMsg("--- SOLVE-GRAPH END ---");
      return {
        "debugMsg": "solveGraph successfull.",
        "result": FLOWINE_CONFIG.successResult
      };
    } catch (error) {
      debugMsg("solveGraph error.");
      debugMsg(error);
      debugMsg("-----------------------");
      debugMsg("--- SOLVE-GRAPH END ---");
      return {
        "debugMsg": "solveGraph error.",
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  async inputPortsHasNullValues(inputPortsArray_) {
    var result_;
    inputPortsArray_.map((e, i) => {
      if (e.portState.data.data === null) result_ = true;
      else result_ = false;
    })
    return result_
  }

  async runNode_async(id, debug = false) {
    var ipdArray_ = [],
      opdArray_ = [];
    var codeArray_ = [];
    var codeString_ = "";
    var ipDataTypes_ = [];
    var actionFunctionLanguage_ = "";
    var actionFunctionCode_ = "";
    var ipdArrayVarName_ = Object.keys({ ipdArray_ })[0];
    var opdArrayVarName_ = Object.keys({ opdArray_ })[0];
    var nodeId_ = id;
    var inputPortHasNullValues_;
    var dataTypeError_ = false;
    var dataTypeErrorObject_ = {};

    // check if there are any NULL - values at the input ports of the node
    // is yes, abort and send null values to all output ports:
    await new Promise(next => {
      this.inputPortsHasNullValues(this.getNodeObjectById(id).inputPorts).then(res_ => {
        inputPortHasNullValues_ = res_;
        next();
      });
    });

    switch (inputPortHasNullValues_) {
      case true:
        this.getNodeObjectById(id).outputPorts.map((e, i) => {
          opdArray_.push(null);
        });
        if (debugMessages) console.log("opdArray_ = ", opdArray_);
        this.getNodeObjectById(id).outputPorts.map((e, i) => {
          // update the output ports of the node:
          e.setData(opdArray_[i]);
          // update the input ports of the successor nodes:
          e.portState.connectedPorts.map((e_, i_) => {
            this.getPortObjectById(e_).setData(opdArray_[i]);
            //console.log("INSIDE OF RUNNODE: ", e_.portState, e_.id)
          });
        });
        // update the nodestate of the node:
        this.getNodeObjectById(id).nodeState.setState("03", "error. one or more inputports have null values. the actionfunction of this node will not run.");
        debugMsg("run node error.");
        debugMsg("--- RUN NODE END ---");
        debugMsg("inputPorts have null values");
        return {
          "debugMsg": "inputPorts have null values",
          "result": FLOWINE_CONFIG.errorResult
        };
      
      case false:
        try {
          debugMsg("--- RUN NODE START ---");

          // check if all the data types from the input ports are correct, if not abort and send error message:
          await new Promise(next => {
            this.checkInputPortDataTypes(id).then(res_ => {
              if (res_.dataTypeError === true) {
                dataTypeError_ = true;
                dataTypeErrorObject_ = res_;
              }
              next();
            })
          })
          if (dataTypeError_ === true) throw new Error(dataTypeErrorObject_.dataTypes);
    
          // everything is ok. so now let's prepare to run the actionFunction of the node:
          var nodeObject = this.getNodeObjectById(nodeId_);
    
          // read the nodes inputports:
          nodeObject.inputPorts.map((e, i) => {
            if (debug)
              console.log("inputPort[" + i + "].data = ", e.portState.data);
            ipDataTypes_.push(e.dataType);
            ipdArray_.push(e.portState.data.data);
          });
    
          actionFunctionLanguage_ = nodeObject.actionFunction.language;
          actionFunctionCode_ = nodeObject.actionFunction.code;
    
          if (debugMessages) console.log("ipdArray_ = ", ipdArray_);
          if (debug) console.log("actionFunction_ = ", actionFunctionCode_);
          if (debug) console.log("codeString_ = ", codeString_);
    
          // define the virtual machine:
          const vm2 = new VM({
            sandbox: { 
              ipdArray_,
              opdArray_,
              fs,
              promisify,
              axios,
              PythonShell
            }
          });
    
          // this is how a nodes action fucntion should look like:
          var EXAMPLE_ACTION_FUCNTION = `
            (async function asyncAxiosGet() {
              const res_ = await axios.get(ipdArray_[0]);
              opdArray_[0] = await res_.data;
              return opdArray_;
            })();`;
    
          switch (actionFunctionLanguage_) {
            case "JavaScript":
              actionFunctionCode_ = actionFunctionCode_
              break;
            
            case "Python":
              // run PythonShell inside JavaScript code
              // generate code for that here
              var tempPythonCode_ = actionFunctionCode_;
              //var tempPythonCode_ = "import json\nimport sys\ntest = sys.stdin.readline()\nprint(json.dumps([{\"g\":\"t\"}, \"wer\"]))"
              var tempPythonCode_encoded_ = encodeURI(tempPythonCode_);
              var tempPythonCode_encoded_replaceStep1_ = tempPythonCode_encoded_.replace(/%22/g, "%5C%22");
              var tempPythonCode_encoded_replaceStep2_ = tempPythonCode_encoded_replaceStep1_.replace(/%0A/g, "%5Cn");
              var tempPythonCode_decoded_ = decodeURI(tempPythonCode_encoded_replaceStep2_);
              console.log(tempPythonCode_)
              console.log(tempPythonCode_encoded_);
              console.log(tempPythonCode_decoded_);
              //actionFunctionCode_ = this.generateJavaScriptCodeForPythonShell(tempPythonCode_decoded_, this.id.toString());
              actionFunctionCode_ = this.generateJavaScriptCodeForPythonShell_withDataTransfer(tempPythonCode_decoded_, ipdArray_, this.id.toString())
              break;
          
            default:
              break;
          }

          // start the vm and run the action function asynchronously:
          // * START
          const vmOutput = await vm2.run(actionFunctionCode_);
          // * END

          if (debugMessages) console.log("opdArray_ = ", opdArray_);
    
          debugMsg("run node successfull");
          debugMsg("--- RUN NODE END ---");
    
          this.getNodeObjectById(id).outputPorts.map((e, i) => {
            // update the output ports of the node:
            if (opdArray_[i]) e.setData(opdArray_[i]);
    
            // update the input ports of the successor nodes:
            e.portState.connectedPorts.map((e_, i_) => {
              this.getPortObjectById(e_).setData(opdArray_[i]);
            });
          });
          // update the nodes debug message:
          this.getNodeObjectById(id).nodeState.setState("02", "execution of the nodes actionFunction was successfull");
    
          return await vmOutput;
        } catch (error) {
          // there was an error. put all output ports of the node to null:
          this.getNodeObjectById(id).outputPorts.map((e, i) => {
            opdArray_.push(null);
          });
          if (debugMessages) console.log("opdArray_ = ", opdArray_);
          this.getNodeObjectById(id).outputPorts.map((e, i) => {
            // update the output ports of the node:
            e.setData(opdArray_[i]);
            // update the input ports of the successor nodes:
            e.portState.connectedPorts.map((e_, i_) => {
              this.getPortObjectById(e_).setData(opdArray_[i]);
              //console.log("INSIDE OF RUNNODE: ", e_.portState, e_.id)
            });
          });
          // update the nodes debug message:
          this.getNodeObjectById(id).nodeState.setState("05", "an error occured during the execution of the nodes actionFunction. error message: "+error.message);
          debugMsg("run node error.");
          debugMsg("--- RUN NODE END ---");
          debugMsg(error.message);
          return {
            "debugMsg": error.message,
            "result": FLOWINE_CONFIG.errorResult
          };
        }

      default:
        break;
    }
  }

  /**
   * solveGraph
   */
  solveGraph() {
    debugMsg("--- SOLVE-GRAPH START ---");
    debugMsg("-------------------------");

    var nodeSequence_ = [];

    // topological sorting of the nodes
    nodeSequence_ = this.getTopologicallySortedNodeIds();

    try {
      // * SOLVER CODE STARTS HERE
      for (let i = 0; i < nodeSequence_.length; i++) {
        var e = nodeSequence_[i];
        var nodeObject_ = this.getNodeObjectById(e);
        if (debugMessages)
          console.log(
            "Node ",
            i,
            ", ",
            nodeObject_.type,
            ", ",
            nodeObject_.nodeType,
            ", ",
            nodeObject_.id
          );
        // * run the node:
        this.runNode(e, true)
      }
      // * SOLVER CODE ENDS HERE
      debugMsg("solve graph successfull");
      debugMsg("-----------------------");
      debugMsg("--- SOLVE-GRAPH END ---");
      return {
        "debugMsg": "solveGraph successfull.",
        "result": FLOWINE_CONFIG.successResult
      };
    } catch (error) {
      debugMsg("solveGraph error.");
      debugMsg(error);
      debugMsg("-----------------------");
      debugMsg("--- SOLVE-GRAPH END ---");
      return {
        "debugMsg": "solveGraph error.",
        "result": FLOWINE_CONFIG.errorResult
      };
    }
  }

  inputPortsHaveNullValues(inputPortsArray_) {
    var result_;
    inputPortsArray_.map((e, i) => {
      if (e.portState.data.data === null) result_ = true;
      else result_ = false;
    })
    return result_;
  }

  runNode(id, debug = false) {
    var ipdArray_ = [],
      opdArray_ = [];
    var codeArray_ = [];
    var codeString_ = "";
    var ipDataTypes_ = [];
    var actionFunctionLanguage_ = "";
    var actionFunctionCode_ = "";
    var ipdArrayVarName_ = Object.keys({ ipdArray_ })[0];
    var opdArrayVarName_ = Object.keys({ opdArray_ })[0];
    var nodeId_ = id;
    var inputPortsHaveNullValues_;
    var dataTypeError_ = false;
    var dataTypeErrorObject_ = {};

    // check if there are any NULL - values at the input ports of the node
    // is yes, abort and send null values to all output ports:
    inputPortsHaveNullValues_ = this.inputPortsHaveNullValues(this.getNodeObjectById(id).inputPorts);

    switch (inputPortsHaveNullValues_) {
      case true:
        this.getNodeObjectById(id).outputPorts.map((e, i) => {
          opdArray_.push(null);
        });
        if (debugMessages) console.log("opdArray_ = ", opdArray_);
        this.getNodeObjectById(id).outputPorts.map((e, i) => {
          // update the output ports of the node:
          e.setData(opdArray_[i]);
          // update the input ports of the successor nodes:
          e.portState.connectedPorts.map((e_, i_) => {
            this.getPortObjectById(e_).setData(opdArray_[i]);
            //console.log("INSIDE OF RUNNODE: ", e_.portState, e_.id)
          });
        });
        // update the nodestate of the node:
        this.getNodeObjectById(id).nodeState.setState("03", "error. one or more inputports have null values. the actionfunction of this node will not run.");
        debugMsg("run node error.");
        debugMsg("--- RUN NODE END ---");
        debugMsg("inputPorts have null values");
        return {
          "debugMsg": "inputPorts have null values",
          "result": FLOWINE_CONFIG.errorResult
        };
      
      case false:
        try {
          debugMsg("--- RUN NODE START ---");

          // check if all the data types from the input ports are correct, if not abort and send error message:

          this.checkInputPortDataTypes(id).then(res_ => {
            if (res_.dataTypeError === true) {
              dataTypeError_ = true;
              dataTypeErrorObject_ = res_;
            }
          });

          if (dataTypeError_ === true) throw new Error(dataTypeErrorObject_.dataTypes);
    
          // everything is ok. so now let's prepare to run the actionFunction of the node:
          var nodeObject = this.getNodeObjectById(nodeId_);
    
          // read the nodes inputports:
          nodeObject.inputPorts.map((e, i) => {
            if (debug)
              console.log("inputPort[" + i + "].data = ", e.portState.data);
            ipDataTypes_.push(e.dataType);
            ipdArray_.push(e.portState.data.data);
          });
    
          actionFunctionLanguage_ = nodeObject.actionFunction.language;
          actionFunctionCode_ = nodeObject.actionFunction.code;
    
          if (debugMessages) console.log("ipdArray_ = ", ipdArray_);
          if (debug) console.log("actionFunction_ = ", actionFunctionCode_);
          if (debug) console.log("codeString_ = ", codeString_);
  
          // * START
          var actionFunctionSandbox = new Function("ipdArray_", "opdArray_", actionFunctionCode_)
          actionFunctionSandbox(ipdArray_, opdArray_);
          // * END

          if (debugMessages) console.log("opdArray_ = ", opdArray_);
    
          debugMsg("run node successfull");
          debugMsg("--- RUN NODE END ---");
    
          this.getNodeObjectById(id).outputPorts.map((e, i) => {
            // update the output ports of the node:
            if (opdArray_[i]) e.setData(opdArray_[i]);
    
            // update the input ports of the successor nodes:
            e.portState.connectedPorts.map((e_, i_) => {
              this.getPortObjectById(e_).setData(opdArray_[i]);
            });
          });
          // update the nodes debug message:
          this.getNodeObjectById(id).nodeState.setState("02", "execution of the nodes actionFunction was successfull");
    
          return {
            "debugMsg": FLOWINE_CONFIG.debugMsg.runNode.success,
            "result": FLOWINE_CONFIG.successResult
          };
        } catch (error) {
          console.log(error);
          // there was an error. put all output ports of the node to null:
          this.getNodeObjectById(id).outputPorts.map((e, i) => {
            opdArray_.push(null);
          });
          if (debugMessages) console.log("opdArray_ = ", opdArray_);
          this.getNodeObjectById(id).outputPorts.map((e, i) => {
            // update the output ports of the node:
            e.setData(opdArray_[i]);
            // update the input ports of the successor nodes:
            e.portState.connectedPorts.map((e_, i_) => {
              this.getPortObjectById(e_).setData(opdArray_[i]);
              //console.log("INSIDE OF RUNNODE: ", e_.portState, e_.id)
            });
          });
          // update the nodes debug message:
          this.getNodeObjectById(id).nodeState.setState("05", "an error occured during the execution of the nodes actionFunction. error message: "+error.message);
          debugMsg("run node error.");
          debugMsg("--- RUN NODE END ---");
          debugMsg(error.message);
          return {
            "debugMsg": error.message,
            "result": FLOWINE_CONFIG.errorResult
          };
        }

      default:
        return {
          "debugMsg": "error in case (runnode)",
          "result": FLOWINE_CONFIG.errorResult
        };
    }
  }

  /**
   * debug
   * just to test and debug things:
   * @returns 
   */
  async debug() {
    var pythonCodeFile_ = "ifc.py";
    var base64_ = this.getPortObjectById("43020279-b455-4cd6-aea0-b3c7f492b807_i_1").portState.data.data;

    async function asyncRunPythonWithDataExchange(fileName, options, dataToSend) {
      let pythonShell_ = new PythonShell(fileName, options);
      pythonShell_.send(dataToSend);
      //pythonShell_.send("hey");
      var message_;
      await new Promise(next => {
        pythonShell_.on("message", message => {
          message_ = message;
          next();
        })
      });
      await new Promise(next => {
        pythonShell_.end(() => {
          next();
        })
      });
      return message_;
    }

    var ipdArray_ = [];
    ipdArray_[0] = base64_

    const return_ = await asyncRunPythonWithDataExchange(
      pythonCodeFile_,
      { mode: "json", args: [this.id.toString()] },
      ipdArray_);
        
    return {
      "debugMsg": "successfull.",
      "result": return_
    };
  }

  generateJavaScriptCodeForPythonShell(pythonCode, userId) {
    return `(async function ifcWallsNode() {
      async function asyncReadFile(fileName) {
        const readFilePromise = promisify(fs.readFile);
          try {
            const result = await readFilePromise(fileName);
            return result;
          } catch (err) {
            return err;
          };
        };
      async function asyncSaveFile(fileName, fileBuffer) {
        const writeFilePromise = promisify(fs.writeFile);
        try {
          await writeFilePromise(fileName, fileBuffer);
          return "file successfully written";
        } catch {
          return "error while writing file";
        };
      };
      async function asyncRunPython(fileName, options) {
        const result = await new Promise((resolve, reject) => {
          PythonShell.run(fileName, options, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
          });
        });
        return result;
      };
      const pythonCodeFile_ = "${userId}_pythonCodeFile.py";
      const pythonCode_ = "${pythonCode}";
      await new Promise(next => {
        asyncSaveFile(pythonCodeFile_, pythonCode_).then(res_ => {
          next();
        }).catch(err => {
          return err;
        })
      });
      const asyncRunPython_ = asyncRunPython(
        pythonCodeFile_,
        {
          mode: "json",
          pythonOptions: ["-u"],
          args: []
        });
      const tempArray_ = await asyncRunPython_;
      fs.unlink(pythonCodeFile_, err => { if (err) throw new Error(pythonCodeFile_+" file deletion error.") });
      opdArray_[0] = tempArray_[0];
      return opdArray_;
    })();`
  }

  generateJavaScriptCodeForPythonShell_withDataTransfer(pythonCode, data, userId) {
    return `(async function ifcWallsNode() {
      const pythonCodeFile_ = "${userId}_pythonCodeFile.py";
      const pythonCode_ = "${pythonCode}";

      async function asyncSaveFile(fileName, fileBuffer) {
        const writeFilePromise = promisify(fs.writeFile);
        try {
          await writeFilePromise(fileName, fileBuffer);
          return "file successfully written";
        } catch {
          return "error while writing file";
        };
      };

      async function asyncRunPythonWithDataExchange(fileName, options, dataToSend) {
        let pythonShell_ = new PythonShell(fileName, options);
        pythonShell_.send(dataToSend);
        var message_;
        await new Promise(next => {
          pythonShell_.on("message", message => {
            message_ = message;
            next();
          })
        });
        await new Promise(next => {
          pythonShell_.end(() => {
            next();
          })
        });
        return message_;
      }
  
      var ipdArray_ = "${data}";

      await new Promise(next => {
        asyncSaveFile(pythonCodeFile_, pythonCode_).then(res_ => {
          next();
        }).catch(err => {
          return err;
        })
      });
  
      const return_ = await asyncRunPythonWithDataExchange(
        pythonCodeFile_,
        { mode: "json", args: ["1"] },
        ipdArray_);

      fs.unlink(pythonCodeFile_, err => { if (err) throw new Error(pythonCodeFile_+" file deletion error.") });

      return_.map((e, i) => {
        opdArray_[i] = return_[i];
      });

      return opdArray_;
    })();`
  }

  async checkInputPortDataTypes(nodeId) {
    var dataTypeError = false;
    var returnArray_ = [];
    this.getNodeObjectById(nodeId).inputPorts.map((e, i) => {
      e.portState.connectedPorts.map((e_, i_) => {
        if ((e.dataType === this.getPortObjectById(e_).dataType) || (e.dataType === "ALL")) returnArray_.push("PORT_"+i+": DATATYPE OK");
        else {
          dataTypeError = true;
          returnArray_.push("PORT_"+i+": WRONG DATATYPE -> EXPECTS [" + e.dataType + "] / GOT ["+this.getPortObjectById(e_).dataType+"]");
        }
      });
    });
    return {
      "dataTypeError": dataTypeError,
      "dataTypes": returnArray_
    }
  }

  isNode(id) {
    if (this.getNodeObjectById(id) === undefined) return {
      "debugMsg": "success",
      "result": false
    };
    else return {
      "debugMsg": "success",
      "result": true
    };
  }

  isEdge(id) {
    if (this.getEdgeObjectById(id) === undefined) return {
      "debugMsg": "success",
      "result": false
    };
    else return {
      "debugMsg": "success",
      "result": true
    };
  }

  getPortObjectById(id) {
    var returnPortObject = {};
    try {
      this.canvas.body.nodes.map((e, i) => {
        e.inputPorts.map((e_, i_) => {
          if (e_.id === id) returnPortObject = e_;
        });
        e.outputPorts.map((e_, i_) => {
          if (e_.id === id) returnPortObject = e_;
        });
      });
      return returnPortObject;
    } catch (error) {
      return undefined;
    }
  }

  getNodeObjectById(id) {
    var returnNodeObject_ = {};
    try {
      this.canvas.body.nodes.map((e, i) => {
        if (e.id === id) returnNodeObject_ = e;
      });
      if (Object.keys(returnNodeObject_).length !== 0) return returnNodeObject_;
      else return undefined;
    } catch (error) {
      return undefined;
    };
  }

  getEdgeObjectById(id) {
    var returnEdgeObject_ = {};
    try {
      this.canvas.body.edges.map((e, i) => {
        if (e.id === id) returnEdgeObject_ = e;
      });
      if (Object.keys(returnEdgeObject_).length !== 0) return returnEdgeObject_;
      else return undefined;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * getAllSuccessorPorts
   * @param {*} id - the id of a node
   */
  getAllSuccessorNodeIds(id) {
    var tempArray_ = [];
    this.getNodeObjectById(id).outputPorts.map((e, i) => {
      e.portState.connectedPorts.map((e_, i_) => {
        tempArray_.push(this.getPortObjectById(e_).holderNodeId);
      });
    });
    return tempArray_;
  }

  /**
   * setPortData - sets data to a port's portState.data object
   * @param {*} id - a port id
   * @param {*} data - the data to set
   */
  setPortData(id, data) {
    console.log(this.getPortObjectById(id));
    var isValidJSON = false;
    try {
      JSON.parse(data);
      isValidJSON = true;
    } catch (error) {
      isValidJSON = false;
    }
    if (isValidJSON) {
      try {
        this.getPortObjectById(id).setData(JSON.parse(data));
        return {
          "debugMsg": "success.",
          "result": FLOWINE_CONFIG.successResult
        }
      } catch (error) {
        return {
          "debugMsg": "error.",
          "result": error.message
        };
      }
    } else {
      try {
        this.getPortObjectById(id).setData(data);
        return {
          "debugMsg": "success.",
          "result": FLOWINE_CONFIG.successResult
        }
      } catch (error) {
        return {
          "debugMsg": "error.",
          "result": error.message
        };
      }
    }
  }

  getTopologicallySortedNodeIds() {
    var nodeSequence__ = [];
    var nodeSequence_reversed_ = []; // helper array

    var g_ = new Graph();

    this.canvas.body.nodes.map((e, i) => {
      g_.addNode(e.id);
    });

    this.canvas.body.edges.map((e, i) => {
      g_.addDirectedEdge(
        this.getPortObjectById(e.sourcePortId).holderNodeId,
        this.getPortObjectById(e.targetPortId).holderNodeId
      );
    });

    nodeSequence_reversed_ = g_.topologicalSort();
    nodeSequence__ = nodeSequence_reversed_.reverse();

    return nodeSequence__;
  }
}

/**
 * Canvas
 */
class Canvas {
  constructor(id, header, body) {
    this.id = id;
    this.header = header;
    this.body = body;
  }
  reset() {
    //this = {};
  }
}

/**
 * CanvasHeader
 */
class CanvasHeader {
  /**
   * constructor
   * @param {*} canvasName - the name of the canvas
   * @param {*} creationDate - the creation date of the canvas
   */
  constructor(canvasName, creationDate) {
    this.canvasName = canvasName;
    this.creationDate = creationDate;
  }
}

/**
 * CanvasBody
 */
class CanvasBody {
  /**
   * constructor
   * @param {*} nodes - array of nodes
   * @param {*} edges - array of edges
   */
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }
}

/**
 * Node
 */
class Node {
  /**
   * constructor
   * @param {*} id - the ID of the node
   * @param {string} type - the node-type
   */
  constructor(
    id,
    type,
    nodeType,
    caption,
    inputPorts,
    outputPorts,
    actionFunction,
    nodeState
  ) {
    var id_,
      type_,
      nodeType_,
      caption_,
      inputPorts_ = [],
      outputPorts_ = [],
      actionFunction_,
      nodeState_;

    switch (
      id &&
      caption &&
      nodeType &&
      inputPorts &&
      outputPorts &&
      actionFunction &&
      nodeState
    ) {
      case null:
        // create a new node with the type that was given
        // here the node is completely new (new id, etc.)
        id_ = uuidv4();
        type_ = type;
        nodeType_ = FLOWINE_NODELIBRARY[type].nodeType;
        caption_ = FLOWINE_NODELIBRARY[type].caption;
        var portNumber_;
        FLOWINE_NODELIBRARY[type].inputPorts.map((e, i) => {
          portNumber_ = i + 1;
          inputPorts_.push(
            new Port(
              id_ + "_i_" + portNumber_,
              "INPUT",
              e.type,
              id_,
              new PortState([], new DataToken(e.type, null)),
              e.visible
            )
          );
        });
        FLOWINE_NODELIBRARY[type].outputPorts.map((e, i) => {
          portNumber_ = i + 1;
          outputPorts_.push(
            new Port(
              id_ + "_o_" + portNumber_,
              "OUTPUT",
              e.type,
              id_,
              new PortState([], new DataToken(e.type, null)),
              e.visible
            )
          );
        });
        actionFunction_ = new ActionFunction(
          FLOWINE_NODELIBRARY[type].actionFunction.language,
          FLOWINE_NODELIBRARY[type].actionFunction.code)
        nodeState_ = new NodeState();
        break;

      default:
        // create a new node with the defined parameters
        // this is for reading from file, etc.
        id_ = id;
        type_ = type;
        nodeType_ = nodeType;
        caption_ = caption;
        inputPorts_ = inputPorts;
        outputPorts_ = outputPorts;
        actionFunction_ = actionFunction;
        nodeState_ = nodeState;
        break;
    }

    this.id = id_;
    this.type = type_;
    this.nodeType = nodeType_;
    this.caption = caption_;
    this.inputPorts = inputPorts_;
    this.outputPorts = outputPorts_;
    this.actionFunction = actionFunction_;
    this.nodeState = nodeState_;
  }

  /**
   * isRootNode
   * returns true if this is a root node (node has no input edges)
   * @param {*} id - the id of the node
   */
  isRoot(id) {
    var isRoot_ = true;
    this.inputPorts.map((e, i) => {
      if (e.portState.connectedPorts.length !== 0) isRoot_ = false;
    });
    return isRoot_;
  }

  /**
   * isInternal
   * returns true if this is an internal node (node has input and output edges)
   * @param {*} id - the id of the node
   */
  isInternal(id) {
    var hasInputEdges_ = false,
      hasOutputEdges_ = false;
    this.inputPorts.map((e, i) => {
      if (e.portState.connectedPorts.length !== 0) hasInputEdges_ = true;
    });
    this.outputPorts.map((e, i) => {
      if (e.portState.connectedPorts.length !== 0) hasOutputEdges_ = true;
    });
    return hasInputEdges_ && hasOutputEdges_;
  }

  /**
   * isLeaf
   * returns true if this is a leaf node (node has no output edges)
   * @param {*} id - the id of the node
   */
  isLeaf(id) {
    var isLeaf_ = true;
    this.outputPorts.map((e, i) => {
      if (e.portState.connectedPorts.length !== 0) isLeaf_ = false;
    });
    return isLeaf_;
  }

  /* 	addInputPort() {
		this.inputPorts.push(new Port(
			this.id+"_i_"+(this.inputPorts.length+1), "INPUT", e.type, id_, new PortState(), e.visible));
	} */
}

class NodeState {
  constructor(state = "01", debugMessage = "this node is new. no data. no connections.") {
    this.state = state;
    this.debugMessage = debugMessage;
  }

  setState(state, debugMessage) {
    this.state = state;
    this.debugMessage = debugMessage;
  }
}

/**
 * ActionFunction
 */
class ActionFunction {
  /**
   * constructor
   * @param {*} language - only "JavaScript" or "Python" allowed (atm)
   * @param {*} code - the code
   */
  constructor(language, code) {
    this.language = language;
    this.code = code;
  }

  setLanguage(language) {
    this.language = language;
  }

  setCode(code) {
    this.code = code;
  }
}

/**
 * Edge
 */
class Edge {
  /**
   * constructor
   * @param {*} id - the ID of the edge
   * @param {*} sourcePortId - the source of the edge (an output port of a node)
   * @param {*} targetPortId - the target of the edge (an input port of a node)
   */
  constructor(id, sourcePortId, targetPortId) {
    var id_, sourcePortId_, targetPortId_;
    switch (id) {
      case null:
        id_ = uuidv4();
        sourcePortId_ = sourcePortId;
        targetPortId_ = targetPortId;
        break;

      default:
        id_ = id;
        sourcePortId_ = sourcePortId;
        targetPortId_ = targetPortId;
        break;
    }
    this.id = id_;
    this.sourcePortId = sourcePortId_;
    this.targetPortId = targetPortId_;
  }
}

/**
 * Port
 */
class Port {
  /**
   * constructor
   * @param {*} id - the id of the port
   * @param {*} ioType - input port or output port
   * @param {*} dataType - what type of data does the port send or receive
   * @param {*} holderNode - the node that the port belongs to
   */
  constructor(id, ioType, dataType, holderNodeId, portState, visible_ = true) {
    this.id = id;
    this.ioType = ioType;
    this.dataType = dataType;
    this.holderNodeId = holderNodeId;
    this.portState = portState;
    this.visible = visible_;
  }

  updateState(connectedPorts, data) {
    this.portState = new PortState(connectedPorts, data);
  }

  setData(data) {
    this.portState.data.data = data;
  }
}

/**
 * PortState
 */
class PortState {
  /**
   * constructor
   * @param {*} connectedPort - connected ports (other end of the connected edge)
   * @param {*} data - the data that cam through the edge (if there is data)
   */
  constructor(connectedPorts = [], data = null) {
    this.connectedPorts = connectedPorts;
    this.data = data;
  }

  addConnectedPort(connectedPortId) {
    this.connectedPorts.push(connectedPortId);
    //this.data = data;
  }

  updateData(data) {
    this.data = data;
  }
}

class DataToken {
  constructor(dataType, data) {
    this.dataType = dataType;
    this.data = data;
  }

  setData(data) {
    this.data = data;
  }
}

/**
 * Graph
 * source: https://www.tutorialspoint.com/Creating-a-Graph-in-Javascript
 */
class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
  }
  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }
  addEdge(node1, node2) {
    this.edges[node1].push(node2);
    this.edges[node2].push(node1);
  }
  addDirectedEdge(node1, node2) {
    this.edges[node1].push(node2);
  }
  display() {
    let graph = "";
    this.nodes.forEach((node) => {
      graph += node + "->" + this.edges[node].join(", ") + "\n";
    });
    console.log(graph);
  }

  /**
   * topologicalSortHelper
   * (source: https://www.tutorialspoint.com/Topological-sorting-using-Javascript-DFS)
   * @param {*} node
   * @param {*} explored
   * @param {*} s
   */
  topologicalSortHelper(node, explored, s) {
    explored.add(node);
    // Marks this node as visited and goes on to the nodes
    // that are dependent on this node, the edge is node ----> n
    this.edges[node].forEach((n) => {
      if (!explored.has(n)) {
        this.topologicalSortHelper(n, explored, s);
      }
    });
    //console.log(s);
    // All dependencies are resolved for this node, we can now add
    // This to the stack.
    s.push(node);
  }

  /**
   * topologicalSort
   * (source: https://www.tutorialspoint.com/Topological-sorting-using-Javascript-DFS)
   */
  topologicalSort() {
    // Create a Stack to keep track of all elements in sorted order
    let s = new Stack(this.nodes.length);
    let explored = new Set();

    // For every unvisited node in our graph, call the helper.
    this.nodes.forEach((node) => {
      if (!explored.has(node)) {
        //console.log("node:", node);
        this.topologicalSortHelper(node, explored, s);
      }
    });

    //console.log(s);

    return s.container;

    /* while (!s.isEmpty()) {
      console.log("spop:", s.pop());
    } */
  }
}

class Stack {
  constructor(maxSize) {
    // Set default max size if not provided
    if (isNaN(maxSize)) {
      maxSize = 10;
    }
    this.maxSize = maxSize; // Init an array that'll contain the stack values.
    this.container = [];
  }

  // A method just to see the contents while we develop this class
  display() {
    console.log(this.container);
  }

  // Checking if the array is empty
  isEmpty() {
    return this.container.length === 0;
  }

  // Check if array is full
  isFull() {
    return this.container.length >= this.maxSize;
  }

  push(element) {
    // Check if stack is full
    if (this.isFull()) {
      console.log("Stack Overflow!");
      return;
    }
    this.container.push(element);
  }

  pop() {
    // Check if empty
    if (this.isEmpty()) {
      console.log("Stack Underflow!");
      return;
    }
    this.container.pop();
  }

  peek() {
    if (isEmpty()) {
      console.log("Stack Underflow!");
      return;
    }
    return this.container[this.container.length - 1];
  }
}

//* FUNCTIONS
//* ---------

/**
 * debugMsg - checks if debug is on, if yes -> displays message in the console
 * @param {string} msg - The debug-message to display in the console
 */
function debugMsg(msg) {
  /* if (FLOWINE_CONFIG.debug) {
    console.log(msg);
  } */
  if (debugMessages) console.log(msg);
}

//* MAIN
//* ----

var flowine = new Flowine();

export { FLOWINE_NODELIBRARY_, FLOWINE_CONFIG_ };

export default flowine;
