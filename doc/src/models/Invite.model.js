import mongoose, { Schema } from "mongoose";

const InviteSchema = new Schema({
    createrdoc: [
        {
            userid: { type: Schema.Types.ObjectId, ref: "User"},
            username: { type: String, required: true }
        }
    ],
    invitedemail: {
        type:String,
        required:true
    },
    invitedaccpetreject:{
        type:Boolean,
    },
    timeexpire:{
        type:String,
    },
    docid:{
        type: Schema.Types.ObjectId, ref: "OrganstionDoc",
        required:true
    },
    Docname:{
        type:String,
        required:true
    },
    orgid:{
        type: Schema.Types.ObjectId, ref: "OrganstionName",
        required:true
    },
    senderemail:{
        type:String
    }
},
    {
        timestamps: true
    })

export const Invite = mongoose.model("Invite", InviteSchema)

