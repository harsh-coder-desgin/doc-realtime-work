import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { PersonalDoc } from "../models/personaldoc.model.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

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
        new ApiResponse(200, createdUser, "Doc Create successfully")
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
        .json(new ApiResponse(200, getallcourse, "All Document fetched successfully"));
})

//personalsavedoc
const personalsavedoc = asyncHandler(async (req, res) => {

    const { doc } = req.body
    const docId = req.params.id;
    const docget = await PersonalDoc.findById(docId)

    if (!countratingandreview) {
        throw new ApiError(404, "No reviews found for the selected course.");
    }

    const totalreview = countratingandreview.length
    let totalrating = 0;

    countratingandreview.forEach(course => {
        totalrating += course.userrating || 0;
    });

    const averageRating = totalreview > 0 ? (totalrating / totalreview).toFixed(1) : 0;

    courseget.totalreview = totalreview
    courseget.rating = averageRating

    await courseget.save()

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, courseget, "Course details fetched successfully"));
})

//getuser
const getcurrentuser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.users,
            "User fetched Successfully"))

})

//refreshaccesstoken
const refreshaccesstoken = asyncHandler(async (req, res) => {

    const incomeingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomeingRefreshToken) {
        throw new ApiError(400, "Refresh token is missing. Please log in again")
    }

    try {
        const decodeedtoken = jwt.verify(
            incomeingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const users = await User.findById(decodeedtoken?._id)

        if (!users) {
            throw new ApiError(401, "Session is invalid or has expired. Please log in again.")
        }

        if (incomeingRefreshToken !== users.refreshToken) {
            throw new ApiError(401, "Session expired or token is invalid. Please log in again")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessRefreshTokens(users._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken },
                    "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token. Please log in again")
    }
})

//changepassword
const changepassword = asyncHandler(async (req, res) => {

    const { currentPassword, newPassword, confirmPassword } = req.body

    if (
        [currentPassword, newPassword, confirmPassword].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Both old and new passwords are required")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(currentPassword)) {
        throw new ApiError(400, "OldPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (!strongPasswordRegex.test(newPassword)) {
        throw new ApiError(400, "NewPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (!strongPasswordRegex.test(confirmPassword)) {
        throw new ApiError(400, "ConfirmPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (confirmPassword !== newPassword) {
        throw new ApiError(400, "New password cannot match ConfirmPassword")
    }

    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password must be different from the old password")
    }

    const users = await User.findById(req.users?._id)
    const ispasswordcorrect = await users.isPasswordCorrect(currentPassword)

    if (!ispasswordcorrect) {
        throw new ApiError(400, "Old password is incorrect")
    }

    users.password = newPassword
    await users.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

//editprofile
const editprofile = asyncHandler(async (req, res) => {

    const { username } = req.body

    if (
        [username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "User name required")
    }

    if (username.trim().length < 5) {
        throw new ApiError(400, "User name must be at least 5 characters long")
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                username: username,
            }
        }
        ,
        { new: true }
    )
        .select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users, "User name updated successfully"));
})

export { personaldoccreate, personalalldoc, userlogout, getcurrentuser, refreshaccesstoken ,changepassword,editprofile }