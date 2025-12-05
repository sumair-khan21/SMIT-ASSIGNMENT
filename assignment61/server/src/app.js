const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const { connectDB } = require("./config/database");
const { Todo } = require("./model/TodoSchema");
const cors = require("cors");
app.use(cors());




// add todo
app.post("/todo", async (req, res) => {
    try {
      const {title , description , status } = req.body;
      const todo = new Todo({title , description , status });
      await todo.save();
      res.send({
        message: "Todo created successfully",
        todo
      })
    } catch (error) {
      res.status(500).send({
      message: "Todo not created",
      error
    })
    }
    
});



// fetch all todos
app.get("/todo", async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).send({
      message: "Todos fetched successfully",
      todos
    })    } catch (error) {
      res.status(500).send({
      message: "Todos not fetched",
      error
    })
    }
});


// fetch single todo
app.get("/todo/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.status(200).send({
      message: "Todo fetched successfully",
      todo
    })    } catch (error) {
      res.status(500).send({
      message: "Todo not fetched",
      error
    })
    }
});


// update todo
app.put("/todo/:id", async (req, res) => {
    try {
      const {title , description , status } = req.body;
      const todo = await Todo.findByIdAndUpdate(req.params.id, {title , description , status });
      res.status(200).send({
      message: "Todo updated successfully",
      todo
    })    } catch (error) {
      res.status(500).send({
      message: "Todo not updated",
      error
    })
    }
});



// delete todo
app.delete("/todo/:id", async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.status(200).send({
      message: "Todo deleted successfully",
      todo
    })    } catch (error) {
      res.status(500).send({
      message: "Todo not deleted",
      error
    })
    }
});




connectDB().then(()=>{
      console.log('Connected successfully to Database using Mongoose');
      app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

}).catch((error)=>{
  console.log('Error connecting to Database', error);
})
