import { Router } from "express"
import { userwritecomment, getcomment, deletecomment, userwritereply, getreply ,deletereply } from "../controllers/comment.controller.js"
import { verifyJWT } from "../middlewares/usertoken.middleware.js"

const router = Router()

//Comment doc
router.route("/createcomment").post(verifyJWT,userwritecomment)
router.route("/getcomment").get(verifyJWT,getcomment)
router.route("/commentdelete").delete(verifyJWT,deletecomment)

//Reply doc
router.route("/createreply").post(verifyJWT,userwritereply)
router.route("/getreply").get(verifyJWT,getreply)
router.route("/replydelete").delete(verifyJWT,deletereply)

//parentreply
router.route("/createparentreply/:id").post(verifyJWT)
router.route("/getparentreply/:id").get(verifyJWT)
router.route("/parentreplydelete/:id").delete(verifyJWT)
router.route("/allreply").get(verifyJWT)

export default router 