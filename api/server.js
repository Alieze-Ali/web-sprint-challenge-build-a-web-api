// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const server = express();

// Middleware
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(express.json());
server.use(projectsRouter);
server.use(actionsRouter);


const currentTime = new Date().toLocaleTimeString();

server.get("/status", (req,res)=>{
    res.status(200).json({message:"hello from node", currentTime});
});

module.exports = server;
