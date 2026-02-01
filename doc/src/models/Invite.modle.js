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
    }
},
    {
        timestamps: true
    })

export const Review = mongoose.model("Invite", InviteSchema)

