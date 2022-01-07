/**
 * External Dependencies
 */
import express_comonjs from "express";
//import nodemon_commonjs from 'nodemon';
import { v4 as uuidv4 } from "uuid";
import path_commonjs from "path";

const express = express_comonjs;
const path = path_commonjs;

/**
 * Own Dependencies
 */
import flowine from "flowine";

/**
 * Server, Port
 */
const server = express();
const port = process.env.PORT || "8000";

/**
 * Path, Uses
 */
server.use(express.json());

/**
 * Routes
 */
server.get("/", (req, res) => {
  res.status(200).send(`Listening to requests on http://localhost:${port}`);
});

server.get("/init", (req, res) => {
  res.status(200).send(flowine.init(true));
});

server.get("/terminate", (req, res) => {
  res.status(200).send(flowine.terminate());
});

server.get("/status", (req, res) => {
  res.status(200).send(flowine.status());
});

server.get("/create-canvas", (req, res) => {
  res.status(200).send(flowine.createCanvas("MyCanvas"));
});
server.get("/delete-canvas", (req, res) => {
  res.status(200).send(flowine.deleteCanvas());
});

server.get("/create-node", (req, res) => {
  res.status(200).send(flowine.createNode(req.query.type));
});

server.get("/delete-node", (req, res) => {
  res.status(200).send(flowine.deleteNode(req.query.id));
});

server.get("/create-edge", (req, res) => {
  res
    .status(200)
    .send(
      flowine.createEdge(req.query.source_port_id, req.query.target_port_id)
    );
});

server.get("/update-edge", (req, res) => {
  res
    .status(200)
    .send(
      flowine.updateEdge(
        req.query.id,
        req.query.source_port_id,
        req.query.target_port_id
      )
    );
});

server.get("/delete-edge", (req, res) => {
  res.status(200).send(flowine.deleteEdge(req.query.id));
});

server.get("/save-canvas-as-json", (req, res) => {
  res.status(200).send(flowine.saveCanvasAsJSON(req.query.file_name));
});

server.get("/open-canvas-from-json", (req, res) => {
  res.status(200).send(flowine.openCanvasFromJSON(req.query.file_name));
});

server.get("/debug-node", (req, res) => {
  res.status(200).send(flowine.debugNode(req.query.id));
});

server.get("/run-node", (req, res) => {
  res.status(200).send(flowine.runNode(req.query.id));
});

server.get("/solve-graph", (req, res) => {
  flowine.solveGraph(true).then(res_ => {
    res.status(200).send(res_);
  });
});

server.get("/set-port-data", (req, res) => {
  res.status(200).send(flowine.setPortData(req.query.id, req.query.data));
});

server.get("/debug", (req, res) => {
  flowine.debug().then(res_ => {
    //console.log("res_ in ind", res_)
    res.status(200).send(res_);
  })
});


/**
 * Server start
 */
server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
