import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username:{
        type:String,
        default:undefined
    },
    commentid: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    parentReplyId: {
        type: Schema.Types.ObjectId,
        ref: "Reply",
        default: null // Important for top-level replies
    },
    replycommnet: {
        type: String,
        required: true
    },
    docid:{
        type: Schema.Types.ObjectId, ref: "OrganstionDoc",
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })



export const Reply = mongoose.model("Reply", replySchema);
