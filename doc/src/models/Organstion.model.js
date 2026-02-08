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
            userid: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            }
        }
    ],
    organstionname: {
        type: String,
    },
    Doc: {
        type: String,
    },
    Docname: {
        type: String,
    },
    orgnameid: {
        type: Schema.Types.ObjectId,
        ref: "OrganstionName"
    }
},
    {
        timestamps: true
    })

export const OrganstionDoc = mongoose.model("OrganstionDoc", OrganstionDocSchema)

