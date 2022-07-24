
`
# CRUD-Using-Express-JS-and-MongoDB
CRUD Using Express JS and MongoDB , used Mongoose


const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const todoSchema = require('../schemas/todoSchema')

const Todo =new mongoose.model('Todo', todoSchema);


// GET ALL THE TODOS

 router.get('/', async (req, res ) => {
    console.log("All Todo")
    try {
        await Todo.find(
            { statuc: "inactive" })
          .then((docs) => res.send(docs))
          .catch((err) => res.status(500).send({ message: err }));
      } catch (err) {
        res.status(500).json({ message: err });
      }
})


// GET A TODO BY ID

 router.get('/:id', async (req, res ) => {
    console.log("GET Based on ID  " + req.params.id)
     await Todo.update({ _id: req.params.id }, { $set: {
        try {
            await Todo.find(
                { _id: req.params.id }
                
            )
              .then((docs) => res.send(docs))
              .catch((err) => res.status(500).send({ message: err }));
          } catch (err) {
            res.status(500).json({ message: err });
          }
 
})



// PUT A TODO BY ID

 router.put('/:id', async (req, res ) => {
    console.log("Update Based on ID  " + req.params.id)
    // await Todo.update({ _id: req.params.id }, { $set: {
        try {
            await Todo.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: {
               status: 'inactive'
           }
           },
           { _findOneAndUpdate : false},
            )
              .then((docs) => res.send(docs))
              .catch((err) => res.status(500).send({ message: err }));
          } catch (err) {
            res.status(500).json({ message: err });
          }
})


// POST  TODO

 router.post('/', async (req, res ) => {
    console.log("Add New Todo By Post Request")
    const newTodo = new Todo(req.body) 
    console.log(newTodo)
    await newTodo.save((err) => {
        if ( err ) {
            res.status(500).json({
                error: 'There Was a Server Side Error'
            });
        }else{
            res.status(200).json({
                message: 'Todo was inserted successfully'
            });
        }
    });
    
})


// POST INSERT  MULTIPLE TODO

 router.post('/all', async (req, res ) => {
    console.log("Add New Todo By Post Request")
      await Todo.insertMany( req.body, err => {

        if ( err ) {
            res.status(500).json({
                error: 'There Was a Server Side Error'
            });
        }else{
            res.status(200).json({
                message: 'Todo was inserted successfully'
            });
        } 
        
    });


})


// DELETE A TODO BY ID

  router.delete('/:id', async (req, res ) => {
    console.log("Delete Todo ID " )
    try {
        await Todo.deleteOne(
            { _id: req.params.id }
            
        )
          .then((docs) => res.send(docs))
          .catch((err) => res.status(500).send({ message: err }));
      } catch (err) {
        res.status(500).json({ message: err });
      }
})

module.exports = router 

`
