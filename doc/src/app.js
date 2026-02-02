import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/error.middleware.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import user from './routes/user.route.js'
import comment from './routes/comment.route.js'
import doc from './routes/doc.route.js'

// http://localhost:8000/api/v1/users/register
app.use("/api/users",user)
app.use("/api/comment",comment)
app.use("/api/doc",doc)
app.use(errorHandler)

export { app }