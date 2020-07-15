const mongoose = require("mongoose") // requiring the mongoose package
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    // creating a schema for project
    name: {
        type: String,
        required: true
    },
    //adding a reference to User,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    taskList: [{type: Schema.Types.ObjectId, ref: 'Task'}],
})

const Project = mongoose.model("project", ProjectSchema) // creating the model from the schema

module.exports = Project// exporting the model