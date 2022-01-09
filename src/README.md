# flowine.js

![https://www.npmjs.com/package/flowine](https://img.shields.io/npm/v/flowine)


flowine.js is an open source engine for flow based programming

## Documentation

https://sbstnkll.github.io/flowine/

## Installation

`npm i flowine`

## Usage

`import flowine from "flowine"`

This is a ES module. You can also use it with Node.js, but have to add the following line to your package.json:

`"type": "module"`

## Introduction

All source files in `/src`:

`flowine.js` - this is the core library  
`config.js` - the configuration file that is used by flowine.js  
`nodelibrary.js` - the standard node-library with some sample nodes  

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

## Support or Contact

flowine is maintained by Sebastian Kulle (github.com/sbstnkll)
