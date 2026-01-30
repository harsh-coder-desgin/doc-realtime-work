import { Router } from "express"
// import {} from "../controllers/creator.controller.js"
// import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"

const router = Router()

//Comment doc
router.route("/createcomment/:id").post(verifyJWT)
router.route("/getcomment/:id").get(verifyJWT)
router.route("/commentdelete/:id").delete(verifyJWT)

//Reply doc
router.route("/createreply/:id").post(verifyJWT)
router.route("/getreply/:id").get(verifyJWT)
router.route("/replydelete/:id").delete(verifyJWT)

//parentreply
router.route("/createparentreply/:id").post(verifyJWT)
router.route("/getparentreply/:id").get(verifyJWT)
router.route("/parentreplydelete/:id").delete(verifyJWT)
router.route("/allreply").get(verifyJWT)

export default router 