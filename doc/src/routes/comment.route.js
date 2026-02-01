import { Router } from "express"
// import {} from "../controllers/creator.controller.js"
import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"

const router = Router()

//Comment doc
router.route("/createcomment").post(verifyJWT)
router.route("/getcomment").get(verifyJWT)
router.route("/commentdelete").delete(verifyJWT)

//Reply doc
router.route("/createreply").post(verifyJWT)
router.route("/getreply").get(verifyJWT)
router.route("/replydelete").delete(verifyJWT)

//parentreply
router.route("/createparentreply/:id").post(verifyJWT)
router.route("/getparentreply/:id").get(verifyJWT)
router.route("/parentreplydelete/:id").delete(verifyJWT)
router.route("/allreply").get(verifyJWT)

export default router 