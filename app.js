const express = require('express')
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')
const app = express()
const port = 5000

app.use(express.json())


// Database connection with mongos


  mongoose
  .connect('mongodb://localhost:27017/todo' )
  .then( ( )  => { console.log("Connection Success") } )
  .catch( ( err ) => console.log( err ) )



// application route 
app.use('/todo',todoHandler)

app.get('/',(req, res) => {
  res.send("I am from Home Page")
})





// Error Handling for the Error Handling
function errorHandler( err, req, res, next )
{

  if(res.headersSent)
  {
    return next(err)
  }

res.status(500).json({error: err})

}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

