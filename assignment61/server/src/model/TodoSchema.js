const mongoose = require("mongoose");
const { Schema } = mongoose;


const TodoSchema = new Schema({
    
   title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},

    {
        collection: 'todo-collection'
    }


)


const Todo = mongoose.model("todo-collection", TodoSchema);

module.exports = {
    Todo

};


