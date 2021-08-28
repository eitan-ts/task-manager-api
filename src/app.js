const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/api/user_router')
const taskRouter = require('./routers/api/task_router')
const path = require("path");


const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'DELETE, PATCH')
    next();
  });

app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/tasks/',taskRouter)

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app