const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user_router')
const taskRouter = require('./routers/task_router')


const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'DELETE, PATCH')
    next();
  });

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

if(process.env.NODE_ENV === 'production'){
   app.use(express.static('../client/build'))
}


module.exports = app