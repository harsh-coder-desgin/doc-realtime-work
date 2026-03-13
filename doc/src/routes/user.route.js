import { Router } from "express"
import { userregister, userlogin, userlogout, getcurrentuser, refreshaccesstoken,verifyauth } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/usertoken.middleware.js"

const router = Router()

//singup and login
router.route("/register").post(userregister)
router.route("/login").post(userlogin)
router.route("/logout").post(verifyJWT,userlogout)
router.route("/refreshtoken").post(refreshaccesstoken)
router.route("/verifyauth").get(verifyJWT,verifyauth)
router.route("/getuser").get(verifyJWT,getcurrentuser)

export default router 