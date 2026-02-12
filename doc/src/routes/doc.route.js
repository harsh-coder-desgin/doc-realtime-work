import { Router } from "express"
import { personaldoccreate, personalalldoc, personalsavedoc, personalgetdocone, personaldocdelete ,organstiondoccreate,
    organstionalldoc,organstionsavedoc,organstionlgetdocone,organstiondocdelete ,Invitesendorganstiondoc,Invitegetorganstiondoc ,
    newpersonalsavedoc,renamedoc,airesponsemessage,orgonedoconly,organstinamecreate,organstionnameget,organstionnamealldoc ,orgrenamedoc,
    accpetorreject,responseinvite ,organstionnamedelete} from "../controllers/doc.controller.js"
import { verifyJWT } from "../middlewares/usertoken.middleware.js"

const router = Router()

//Personal doc
router.route("/createdoc").post(verifyJWT,personaldoccreate)
router.route("/alldoc").get(verifyJWT,personalalldoc)
router.route("/savedoc/:id").post(verifyJWT,personalsavedoc)
router.route("/newdocsave").post(verifyJWT,newpersonalsavedoc)
router.route("/renamedoc/:id").patch(verifyJWT,renamedoc)
router.route("/getdoc/:id").get(verifyJWT,personalgetdocone)
router.route("/docdelete/:id").get(verifyJWT,personaldocdelete)

//Organstion doc
router.route("/orgcreatedoc/:id").post(verifyJWT,organstiondoccreate)
router.route("/orgname").post(verifyJWT,organstinamecreate)
router.route("/getorgname/:id").post(verifyJWT,organstionnameget)
router.route("/orgnamedocget/:id").get(verifyJWT,organstionnamealldoc)
router.route("/orgrenamedoc/:id").patch(verifyJWT,orgrenamedoc)

// orgdeletedoc
// old api 
router.route("/oneorgdocall").get(verifyJWT,orgonedoconly)
router.route("/orgalldoc").get(verifyJWT,organstionalldoc)
router.route("/orgsavedoc/:id").post(verifyJWT,organstionsavedoc)
router.route("/orggetdoc/:id").get(verifyJWT,organstionlgetdocone)
router.route("/orgdeletedoc/:id").get(verifyJWT,organstiondocdelete)

router.route("/orgnamedelete/:id").get(verifyJWT,organstionnamedelete)

//inivite
router.route("/createinvite").post(verifyJWT,Invitesendorganstiondoc)
router.route("/getinvite/:id").get(verifyJWT,Invitegetorganstiondoc)
router.route("/userinviteget").get(verifyJWT,accpetorreject)
router.route("/responseofinvite").patch(verifyJWT,responseinvite)

//AI api
router.route("/airesponse").post(verifyJWT,airesponsemessage)

export default router 