var mongoose = require('mongoose')
var Schema = mongoose.Schema

var taskSchema = new Schema(
    {
       Task: {
           type: String,
           required: "Task is required"
       },
       Priority: {
           type: Number,
           required: "Priority is required"
       },
       Notes: {
        type: String,
    }
    }
)

var task = mongoose.model('Task', taskSchema)

module.exports = task