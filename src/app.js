const express = require('express')
const userRouter = require('./routers/api/user_router')
const taskRouter = require('./routers/api/task_router')
const path = require("path");
require('./db/mongoose')


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


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.resolve(__dirname, "../client/build")))
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}else{
  app.get("/",(request, response) => {
    response.send('API is running!')
  })
}

module.exports = app