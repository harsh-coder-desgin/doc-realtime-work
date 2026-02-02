import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { PersonalDoc } from "../models/personaldoc.model.js";
import { OrganstionDoc } from "../models/Organstion.model.js"
import { Invite } from "../models/Invite.model.js"
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose";

//Personal Doc api
//personal doc create
const personaldoccreate = asyncHandler(async (req, res) => {

    const { doc, docname } = req.body
    const userId = req.users._id
    const username = req.users.username

    if (
        [doc, docname,userId,username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (doc docname) are required")
    }

    if (username.trim().length < 5) {
        throw new ApiError(400, "user name must be at least 5 characters long")
    }

    const user = await PersonalDoc.create({
        username: username.toLowerCase(),
        Doc:doc,
        Docname:docname,
        // userId
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
                Doc:doc,
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

    const { doc, docname  } = req.body
    const userId = req.users._id
    const username = req.users.username

    if (
        [doc,docname,username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (doc docname username) are required")
    }

    const docget = await OrganstionDoc.create({
        createrdocusername: username.toLowerCase(),
        Doc:doc,
        Docname:docname,
        // userId
    })

    if (!docget) {
        throw new ApiError(500, "Failed to create doc. Please try again.");
    }

    return res.status(201).json(
        new ApiResponse(200, docget, "Doc Create successfully")
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
                Doc:doc,
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

    const {docname,invitedemail,username} = req.body
    const userId = req.users._id

    if (
        [invitedemail,userId,username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (invitedemail,userId,username) are required")
    }

    const invited = await Invite.create({
        Docname:docname,
        invitedemail:invitedemail,
        createrdoc:username,userId,
        invitedaccpetreject:false
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

    const useremail = req.users.email
    const invited = await Invite.find({invitedemail:useremail})

    if (!invited) {
        throw new ApiError(400, "Invited not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, invited, "Doc details fetched successfully"));
})

export { personaldoccreate, personalalldoc, personalsavedoc, personalgetdocone, personaldocdelete ,organstiondoccreate,
    organstionalldoc,organstionsavedoc,organstionlgetdocone,organstiondocdelete,Invitesendorganstiondoc,Invitegetorganstiondoc }