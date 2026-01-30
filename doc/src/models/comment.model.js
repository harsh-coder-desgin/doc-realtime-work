import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username:{
        type:String,
        default:undefined
    },
    docid:{
        type: Schema.Types.ObjectId, ref: "OrganstionDoc",
        required:true
    },
    sendcomment: [
        {
            sendid: { type: String, required:true},
            sendname: { type: String, required: true }
        }
    ],
    usercomment: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })



export const Comment = mongoose.model("Comment", commentSchema);
