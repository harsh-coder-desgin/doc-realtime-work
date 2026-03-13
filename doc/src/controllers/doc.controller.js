import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { PersonalDoc } from "../models/personaldoc.model.js";
import { OrganstionDoc } from "../models/Organstion.model.js"
import { Invite } from "../models/Invite.model.js"
import { User } from "../models/user.model.js"
import { OrganstionName } from "../models/OrganastionName.model.js";

//Personal Doc api
//personal doc create
const personaldoccreate = asyncHandler(async (req, res) => {

    const { docname, doc } = req.body
    const userId = req.users._id
    const username = req.users.username

    if (
        [docname, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (docname) are required")
    }

    if (username.trim().length < 5) {
        throw new ApiError(400, "user name must be at least 5 characters long")
    }

    const user = await PersonalDoc.create({
        username: username.toLowerCase(),
        Docname: docname,
        userid: userId,
        Doc: doc
    })

    if (!user) {
        throw new ApiError(500, "Failed to create doc. Please try again.");
    }

    return res.status(201).json(
        new ApiResponse(200, user, "Doc Create successfully")
    )

})

//personal alldoc
const personalalldoc = asyncHandler(async (req, res) => {
    const userid = req.users._id.toString()

    const getalldoc = await PersonalDoc.find({ userid: userid })

    if (!getalldoc) {
        throw new ApiError(400, "Unable to fetch Doc at the moment. Please try again later");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getalldoc, "All Document fetched successfully"));
})

//personal save doc
const personalsavedoc = asyncHandler(async (req, res) => {

    const { doc } = req.body
    const docId = req.params.id;

    if (
        [doc].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields Doc are required")
    }

    const updateddoc = await PersonalDoc.findByIdAndUpdate(
        docId,
        {
            $set: {
                Doc: doc,
            }
        }
        ,
        { new: true }
    )

    await updateddoc.save().catch(() => {
        throw new ApiError(500, "An unexpected error occurred while updating the doc. Please try again later.");
    });

    if (!updateddoc) {
        throw new ApiError(404, "Doc not found. Please check the doc ID and try again.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateddoc, "Doc Saved successfully"));
})

//personal new save doc
const newpersonalsavedoc = asyncHandler(async (req, res) => {

    const { doc, docid } = req.body

    if (
        [doc].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields Doc are required")
    }

    const updateddoc = await PersonalDoc.findByIdAndUpdate(
        docid,
        {
            $set: {
                Doc: doc,
            }
        }
        ,
        { new: true }
    )

    await updateddoc.save().catch(() => {
        throw new ApiError(500, "An unexpected error occurred while updating the doc. Please try again later.");
    });

    if (!updateddoc) {
        throw new ApiError(404, "Doc not found. Please check the doc ID and try again.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateddoc, "Doc Saved successfully"));
})

//personal get docone
const personalgetdocone = asyncHandler(async (req, res) => {

    const docId = req.params.id;
    const docget = await PersonalDoc.findById(docId)

    if (!docget) {
        throw new ApiError(400, "Doc not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, docget, "Doc details fetched successfully"));
})

//personal doc delete
const personaldocdelete = asyncHandler(async (req, res) => {

    const docId = req.params.id;
    const deletedata = await PersonalDoc.findByIdAndDelete(docId)

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the course. Please try again");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Doc deleted successfully"));
})

//Organstion Doc api
//organstion doc create
const organstiondoccreate = asyncHandler(async (req, res) => {

    const { Doc, id, docname, organstionname, createuserid, createrdocusername } = req.body

    if (
        [Doc, docname, createrdocusername, organstionname, createuserid].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (Doc docname createuserid organstionname createrdocusername) are required")
    }

    const docget = await OrganstionDoc.create({
        createrdocusername: createrdocusername,
        Docname: docname,
        createuserid: createuserid,
        organstionname: organstionname,
        Doc: Doc,
        orgnameid: id
    })

    if (!docget) {
        throw new ApiError(500, "Failed to create doc. Please try again.");
    }

    return res.status(201).json(
        new ApiResponse(200, docget, "Doc Create successfully")
    )

})

//organstinamecreate
const organstinamecreate = asyncHandler(async (req, res) => {

    const { organstionname } = req.body
    const userId = req.users._id
    const username = req.users.username

    if (
        [organstionname, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (username organstionname) are required")
    }

    const docget = await OrganstionName.create({
        createuserid: userId,
        createrdocusername: username,
        organstionname: organstionname
    })

    if (!docget) {
        throw new ApiError(500, "Failed to create doc. Please try again.");
    }

    return res.status(201).json(
        new ApiResponse(200, docget, "Organstion Create successfully")
    )
})

//organstion alldoc
const organstionalldoc = asyncHandler(async (req, res) => {

    const userid = req.users._id.toString()
    const getalldoc = await OrganstionDoc.find({ alluserworking: userid })

    if (!getalldoc) {
        throw new ApiError(400, "Unable to fetch Doc at the moment. Please try again later");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getalldoc, "All Document fetched successfully"));
})

//organstion save doc
const organstionsavedoc = asyncHandler(async (req, res) => {

    const { doc } = req.body
    const docId = req.params.id;

    if (
        [doc].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields Doc are required")
    }

    const updateddoc = await OrganstionDoc.findByIdAndUpdate(
        docId,
        {
            $set: {
                Doc: doc,
            }
        }
        ,
        { new: true }
    )

    await updateddoc.save().catch(() => {
        throw new ApiError(500, "An unexpected error occurred while updating the doc. Please try again later.");
    });

    if (!updateddoc) {
        throw new ApiError(404, "Doc not found. Please check the doc ID and try again.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateddoc, "Doc Saved successfully"));
})

//organstion get docone
const organstionlgetdocone = asyncHandler(async (req, res) => {

    const docId = req.params.id;
    const docget = await OrganstionDoc.findById(docId)

    if (!docget) {
        throw new ApiError(400, "Doc not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, docget, "Doc details fetched successfully"));
})

//organstion doc delete
const organstiondocdelete = asyncHandler(async (req, res) => {

    const docId = req.params.id;
    const deletedata = await OrganstionDoc.findByIdAndDelete(docId)

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the course. Please try again");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Doc deleted successfully"));
})

//Invite send organstion doc
const Invitesendorganstiondoc = asyncHandler(async (req, res) => {

    const { docname, invitedemail, docid, orgid } = req.body
    const userId = req.users._id
    const senderemail = req.users.email
    const username = req.users.username

    if (
        [invitedemail, username, docid, orgid].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (invitedemail,userId,username,docid,orgid,senderemail) are required")
    }

    const users = await User.findOne({
        $or: [{ invitedemail }]
    })

    if (!users) {
        throw new ApiError(400, "No account matches the provided email")
    }

    const invited = await Invite.create({
        Docname: docname,
        invitedemail: invitedemail,
        createrdoc: [
            {
                userid: userId,
                username: username,
            },
        ],
        invitedaccpetreject: null,
        docid: docid,
        orgid: orgid,
        senderemail: senderemail
        // userId
    })

    if (!invited) {
        throw new ApiError(500, "Failed to send invite. Please try again.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "invite send successfully"));
})

//Invite get organstion doc
const Invitegetorganstiondoc = asyncHandler(async (req, res) => {

    const orgid = req.params.id
    const invited = await Invite.find({ orgid: orgid })

    if (!invited) {
        throw new ApiError(400, "Invited not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, invited, "Doc details fetched successfully"));
})

//Invite get for input accpet or reject users organstion doc
const accpetorreject = asyncHandler(async (req, res) => {

    const useremail = req.users.email
    const invited = await Invite.find({ invitedemail: useremail })

    if (!invited) {
        throw new ApiError(400, "Invited not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, invited, "Doc details fetched successfully"));
})

//renamedoc doc
const renamedoc = asyncHandler(async (req, res) => {

    const { docname } = req.body
    const docID = req.params.id

    if (
        [docname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Doc name required")
    }

    if (docname.trim().length < 2) {
        throw new ApiError(400, "Doc name must be at least 2 characters long")
    }

    const users = await PersonalDoc.findByIdAndUpdate(
        docID,
        {
            $set: {
                Docname: docname,
            }
        }
        ,
        { new: true }
    )
        .select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Doc name updated successfully"));
})

//airepsons emessage doc       
const airesponsemessage = asyncHandler(async (req, res) => {

    const { usermessage } = req.body

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{
                            text: `
                    if user ask for codeing related que then Respond ONLY in number(1) JSON format and if
                    user ask other topic que then ask ONLY in number(2) JSON format and if user ask for create image return number(3) JSON format 

                    number(1):{
                    "heading": "",
                    "explanation": "",
                    "code": "",
                    Give me here synatx Only. if syntax was not avaliable then give me some information only 1-2 line "syntax": ""
                    }

                    number(2):{
                    "heading": "",
                    "explanation": "",
                    "summary":""
                    }

                     number(3):{
                    "heading": "Sorry cannot create image for now",
                    }
                    User question: ${usermessage}`
                        }]
                    }
                ]
            })
        }
    );

    if (!response) {
        throw new ApiError(400, "Some error Try Again later")
    }

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!aiText) {
        throw new ApiError(400, "Some error Try Again later")
    }

    const cleanText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


    if (!cleanText) {
        throw new ApiError(400, "Some error Try Again later")
    }

    const structured = JSON.parse(cleanText);

    return res
        .status(200)
        .json(new ApiResponse(200, structured, "Ai Reply successfully"));
})

//orgonedoc get docone
const orgonedoconly = asyncHandler(async (req, res) => {
    const userId = req.users._id
    const emailuser = req.users.email

    let docget = await OrganstionName.find({ createuserid: userId })

    if (docget.length > 0) {
        return res.status(200).json(
            new ApiResponse(
                200,
                docget,
                "Created docs fetched successfully"
            )
        )
    }

    if (docget.length === 0) {
        let inviteduser = await Invite.find({ invitedemail: emailuser });

        if (inviteduser.length > 0) {
            const orgIds = inviteduser.map(invite => invite.orgid);
            docget = await OrganstionName.find({
                _id: { $in: orgIds }
            });
        }
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            docget,
            "Doc details fetched successfully"
        )
    )
})

//organstion get name
const organstionnameget = asyncHandler(async (req, res) => {

    const { id } = req.body
    const orgnameget = await OrganstionName.findById(id)

    if (!orgnameget) {
        throw new ApiError(400, "orgname not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, orgnameget, "Doc details fetched successfully"));
})

//organstion name alldoc
const organstionnamealldoc = asyncHandler(async (req, res) => {

    const orgnameId = req.params.id;
    const orgnameget = await OrganstionDoc.find({ orgnameid: orgnameId })

    if (!orgnameget) {
        throw new ApiError(400, "Doc not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, orgnameget, "Doc details fetched successfully"));
})

//renamedoc org
const orgrenamedoc = asyncHandler(async (req, res) => {

    const { docname } = req.body
    const docID = req.params.id

    if (
        [docname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Doc name required")
    }

    if (docname.trim().length < 2) {
        throw new ApiError(400, "Doc name must be at least 2 characters long")
    }

    const users = await OrganstionDoc.findByIdAndUpdate(
        docID,
        {
            $set: {
                Docname: docname,
            }
        }
        ,
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Doc name updated successfully"));
})

//response invite 
const responseinvite = asyncHandler(async (req, res) => {

    const { acceptorreject, inviteID } = req.body

    if (typeof acceptorreject !== "boolean") {
        throw new ApiError(400, "accept or reject is required")
    }

    const updateinvited = await Invite.findByIdAndUpdate(
        inviteID,
        {
            $set: {
                invitedaccpetreject: acceptorreject,
            }
        }
        ,
        { new: true }
    )

    if (!updateinvited) {
        throw new ApiError(404, "Invited not found. Please check the Invited ID and try again.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateinvited, "Invited Saved successfully"));
})

//organstion name delete
const organstionnamedelete = asyncHandler(async (req, res) => {

    const docId = req.params.id;
    const deletedata = await OrganstionName.findByIdAndDelete(docId)
    const deletealldata = await OrganstionDoc.deleteMany({ orgnameid: docId })

    if (!deletealldata) {
        throw new ApiError(400, "Failed to delete the Doc. Please try again");
    }

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the Doc. Please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Doc deleted successfully"));
})

//organstion name edit
const editorgnationname = asyncHandler(async (req, res) => {
    
    const { organtionname,id } = req.body

    if (
        [organtionname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "organtion name required")
    }

    if (organtionname.trim().length < 2) {
        throw new ApiError(400, "organtion name must be at least 2 characters long")
    }

    const users = await OrganstionName.findByIdAndUpdate(
        id,
        {
            $set: {
                organstionname: organtionname,
            }
        }
        ,
        { new: true }
    )
    
    return res
        .status(200)
        .json(new ApiResponse(200, users, "organstion name updated successfully"));
  
})

export {
    personaldoccreate, personalalldoc, personalsavedoc, personalgetdocone, personaldocdelete, organstiondoccreate,
    organstionalldoc, organstionsavedoc, organstionlgetdocone, organstiondocdelete, Invitesendorganstiondoc, Invitegetorganstiondoc,
    newpersonalsavedoc, renamedoc, airesponsemessage, orgonedoconly, organstinamecreate, organstionnameget, organstionnamealldoc, orgrenamedoc,
    accpetorreject, responseinvite, organstionnamedelete,editorgnationname
}