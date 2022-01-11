/**
 * External Dependencies
 */
 import "dotenv/config";
 import express_ from "express"; const express = express_;
 import path from 'path';
 import { fileURLToPath } from 'url';
 
 /**
  * Own Dependencies
  */
 import { debugMessage } from "./modules/helperFunctions.js";
 
 /**
  * Environment
  */
 if (process.env.NODE_ENV === "production") {
   debugMessage("production mode");
 } else {
   debugMessage("development mode");
 }
 
 /**
  * App, Port
  */
 const app = express();
 const port = process.env.PORT || 8000;
 
 /**
  * Uses
  */
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 app.use(express.static(__dirname + "/"));
 app.use(express.static(__dirname + "../"));
 app.use(express.static(__dirname + "../frontend/build/"));
 app.use(express.static(path.resolve(__dirname + "/../frontend/build/")));
 app.use(express.static(__dirname + 'node_modules/'));
 app.use(express.json());
 
 /**
  * Routes
  */
 app.get("/", (req, res) => {
   if (process.env.NODE_ENV === "production") {
     res.status(200).sendFile(
       path.resolve(__dirname + "/../frontend/build/index.html"));
   } else {
     res.status(200).send("OK. development mode.");
   }
 });
 
 /**
  * Server start
  */
 const server = app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
 });