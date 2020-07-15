const mongoose = require("mongoose") // requiring the mongoose package
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    finishedDate: {
        type: Date,
    },
    //adding a reference to User,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    //adding a reference to Project,
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
})

const Task = mongoose.model("task", TaskSchema) // creating the model from the schema

module.exports = Task // exporting the model