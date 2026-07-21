import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
    title:{
        type:String,
         required: [String, "Idea title is required"],
         unique:true
    },
    description:{
     type:String,
     default:""
    }
}, {timestamps:true});

const Idea = mongoose.model("Idea", IdeaSchema);

export default Idea
