import { Router } from "express"
import { userregister, userlogin, userlogout, getcurrentuser, refreshaccesstoken ,changepassword,editprofile,testonly } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/usertoken.middleware.js"

const router = Router()

//singup and login
router.route("/register").post(userregister)
router.route("/login").post(userlogin)
router.route("/logout").post(verifyJWT,userlogout)
router.route("/refreshtoken").post(refreshaccesstoken)
router.route("/verifyauth").get(verifyJWT)
router.route("/getuser").get(verifyJWT,getcurrentuser)

router.route("/test").get(testonly)


//edit profile
router.route("/changepassword").post(verifyJWT,changepassword)
router.route("/editprofile").patch(verifyJWT,editprofile)

export default router 