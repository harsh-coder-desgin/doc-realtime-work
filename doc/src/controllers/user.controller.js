import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
// import mongoose from "mongoose";

//generate-AccessRefreshTokens
const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        // const accessToken=user.generateAccessToken
        // const refreshToken=user.generateRefreshToken
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while refresh and access token")

    }
}

//user-register
const userregister = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (user name, email, password) are required")
    }

    if (username.trim().length < 5) {
        throw new ApiError(400, "user name must be at least 5 characters long")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }
    const existeduser = await User.findOne({
        $or: [{ email }]
    })

    if (existeduser) {
        throw new ApiError(400, "A user with this email or user name already exists")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
    })

    if (!user) {
        throw new ApiError(500, "Failed to create user. Please try again.");
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating your account. Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully. Please verify your email to activate your account")
    )

})

//user-login
const userlogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Email, user name, and password are required")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const users = await User.findOne({
        $or: [{ email }]
    })

    if (!users) {
        throw new ApiError(400, "No account matches the provided email and creator name")
    }

    if (users.email !== email) {
        throw new ApiError(400, "The email is incorrect.");
    }
    const checkpasswordiscorrect = await users.isPasswordCorrect(password)

    if (!checkpasswordiscorrect) {
        throw new ApiError(400, "Incorrect password. Please try again")
    }

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(users._id)
    const loginUser = await User.findById(users._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                users: loginUser, accessToken,
                refreshToken
            },
                "Login successfully"
            )
        )
})

//user-logout
const userlogout = asyncHandler(async (req, res) => {

    const userId = req.users._id

    if (!userId) {
        throw new ApiError(401, "User authentication failed. Please log in again.");
    }

    await User.findByIdAndUpdate(
        userId, {
        $set: {
            refreshToken: ""
        }
    },
        {
            new: true
        }
    ).catch(() => {
        throw new ApiError(500, "Something went wrong while logging out. Please try again.");
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
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

export { userregister, userlogin, userlogout, getcurrentuser, refreshaccesstoken ,changepassword,editprofile }