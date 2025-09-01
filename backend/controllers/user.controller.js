import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password) {
            return res
            .status(400)
            .json({
            message: "Invalid Credientals"
            })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Please Provide the legitimate email address"
                })
        }
        if(password < 6) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Password must be atleast 6 characters"
            })
        }
        const existingUserEmail = await User.findOne({email: email});
        if(existingUserEmail) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Email already exists"
            })
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })

        return res
        .status(200)
        .json({
            success: true,
            message: "Account Created Successfully"
        })

    } catch (error) {
        console.log("An error Occured");
            return res
            .status(500)
            .json({
            message: "Unable To register"
        })
    }
}

export const login = async (req, res) => {
        try {
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    success: false,
                    message: "All Fields Are Required"
                })
            }
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password user"
                })
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({
                    success: false,
                    message: "Invalid Credientials"
                })
            }

            const token = await
                jwt.sign({userId: user._id},
                process.env.SECRET_KEY,
                {expiresIn: "1D"});

                return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, samesite: "strict"})
                    .json({
                        success: true,
                        message: `Welcome back ${user.firstName}`,
                        user
                    })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Failed To Login"
            })
        }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Loggedout Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async(req, res) => {
    try {
        const userId = req.id;
        const {firstName, lastName, occupation, bio, instagram, facebook, linkedin, github} = req.body;
        const file = req.file;

        const fileUri = getDataUri(file);
        let cloudResponse = await cloudinary.uploader.upload(fileUri)

        const user = await User.findById(userId).select("-password");
        if(!user) {
            return res.status(404).json({message: "user Not Found", success: false})
        }

        //updating data
        if(firstName) user.firstName = firstName
        if(lastName) user.lastName = lastName
        if(occupation) user.occupation = occupation
        if(instagram) user.instagram = instagram
        if(facebook) user.facebook = facebook
        if(linkedin) user.linkedin = linkedin
        if(user.github) user.github = github
        if(bio) user.bio = bio
        if(file) user.photoUrl = cloudResponse.secure_url

        await user.save()
        return res.status(200).json({success: true, message: "Profile updated Successfully", user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Failed To update profile"})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            success: true, message: "User List fetched", total: users.length, users
        })
    } catch (error) {
        console.error("Error fetching the users", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        })
    }
} 