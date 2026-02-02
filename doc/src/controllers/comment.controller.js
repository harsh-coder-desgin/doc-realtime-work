import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Reply } from "../models/reply.model.js"
import { Comment } from "../models/comment.model.js"
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose";

//comment write
const userwritecomment = asyncHandler(async (req, res) => {

    const { docid, sendcomment, usercomment } = req.body
    const userID = req.users._id; 
    const username = req.users.username

    if (
        [username, docid, sendcomment, usercomment].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "username, docid, sendcomment, usercommen are required")
    }

    const createcomment = await Comment.create({
        username: username,
        sendcomment :sendcomment,
        usercomment: usercomment,
        isDeleted:false,
        // docid
        // userID
    })

    if (!createcomment) {
        throw new ApiError(500, "Fail to craete comment");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createcomment, "Comment submitted successfully"));
})

//getcomment
const getcomment = asyncHandler(async (req, res) => {

    const { docid } = req.body
    const userID = req.users._id; 
    if (
        [userID, docid,].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "userid, docid, are required")
    }

    const createcomment = await Comment.find({
        userid: userID,
        docid :docid,
    })

    if (!createcomment) {
        throw new ApiError(500, "Fail to find comment");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createcomment, "Comment find successfully"));
})

//comment delete
const deletecomment = asyncHandler(async (req, res) => {

    const {commentId} = req.body;
    const deletedata = await Comment.findByIdAndDelete(commentId)

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the comment. Please try again");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Comment deleted successfully"));
})

//reply write
const userwritereply = asyncHandler(async (req, res) => {

    const { docid, replycommnet,commentid } = req.body
    const userID = req.users._id; 
    const username = req.users.username

    if (
        [username, docid, replycommnet,commentid].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "username, docid, sendcomment, replycommnet,commentid are required")
    }

    const createreply = await Reply.create({
        username: username,
        replycommnet: replycommnet,
        parentReplyId:null,
        commentid:commentid,
        isDeleted:false,
        // docid
        // userID
    })

    if (!createreply) {
        throw new ApiError(500, "Fail to Reply comment");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createreply, "Reply submitted successfully"));
})

//getreply
const getreply = asyncHandler(async (req, res) => {

    const { docid,commentid } = req.body
    const userID = req.users._id; 

    if (
        [userID, docid,commentid].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "userid, docid,commentid are required")
    }

    const getreplycomment = await Reply.find({
        userid: userID,
        docid :docid,
        commentid:commentid,
    })

    if (!getreplycomment) {
        throw new ApiError(500, "Fail to find Replycomment");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getreplycomment, "Replycomment find successfully"));
})

//deletereply
const deletereply = asyncHandler(async (req, res) => {

    const {commentId} = req.body;
    const deletedata = await Comment.findByIdAndDelete(commentId)

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the comment. Please try again");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Comment deleted successfully"));
})

export { userwritecomment, getcomment, deletecomment, userwritereply, getreply ,deletereply }