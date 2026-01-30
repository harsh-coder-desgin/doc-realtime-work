import mongoose, { Schema } from "mongoose";

const PersonalDocSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Doc:{
        type:String,
        required:true
    }
},
    {
        timestamps: true
    })

export const Review = mongoose.model("PersonalDoc", PersonalDocSchema)

