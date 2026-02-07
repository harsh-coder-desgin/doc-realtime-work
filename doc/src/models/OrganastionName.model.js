import mongoose, { Schema } from "mongoose";

const OrganstionNameSchema = new Schema({
    createrdocusername: {
        type: String, 
        required: true 
    },
    createuserid: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    organstionname:{
        type:String,
    },
},
    {
        timestamps: true
    })

export const OrganstionName = mongoose.model("OrganstionName", OrganstionNameSchema)

