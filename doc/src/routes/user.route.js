import { Router } from "express"
// import { } from "../controllers/user.controller.js"
// import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"

const router = Router()

//singup and login
router.route("/register").post(registercreator)
router.route("/login").post(logincreator)
router.route("/logout").post(verifyJWT,logoutcreator)
router.route("/refreshtoken").post(refreshaccesstoken)
router.route("/verifyauth").get(verifyJWT,verifyauth)
router.route("/getuser").get(verifyJWT,getcurrentuser)

//edit profile
router.route("/changepassword").post(verifyJWT,changecurrentpassword)
router.route("/editprofile").patch(verifyJWT,editprofilcreator)

export default router 