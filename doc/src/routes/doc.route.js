import { Router } from "express"
// import {} from "../controllers/creator.controller.js"
// import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"

const router = Router()

//Personal doc
router.route("/createdoc").post(verifyJWT)
router.route("/alldoc").get(verifyJWT)
router.route("/savedoc/:id").post(verifyJWT)
router.route("/getdoc/:id").get(verifyJWT)
router.route("/docdelete/:id").delete(verifyJWT)

//Organstion doc
router.route("/orgcreatedoc").post(verifyJWT)
router.route("/orgalldoc").get(verifyJWT)
router.route("/orgsavedoc/:id").post(verifyJWT)
router.route("/orggetdoc/:id").get(verifyJWT)
router.route("/orgdeletedoc/:id").delete(verifyJWT)

//inivite
router.route("/createinvite").post(verifyJWT)
router.route("/getinvite").get(verifyJWT)

export default router 