import mongoose, { Schema } from "mongoose";

const OrganstionDocSchema = new Schema({
    createrdocusername: {
        type: String, 
        required: true 
    },
    createuserid: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    alluserworking: [
        {
            userid: [{ type: String, required: true }],
            username: [{ type: String, required: true }]
        }
    ],
    Doc: {
        type: String,
        required: true
    },
    Docname:{
        type:String,
        required:true
    }
},
    {
        timestamps: true
    })

export const OrganstionDoc = mongoose.model("OrganstionDoc", OrganstionDocSchema)

