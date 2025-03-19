import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import crypto from "crypto";
import { genrateTokenAndSetCookie} from '../utils/genrateTokenAndSetCookie.js';
import {  genrateRefreshTokenAndSetCookie } from '../utils/genrateRefreshTokenAndSetCookie.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "user already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(10000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })
        await user.save();
        genrateTokenAndSetCookie(res, user._id); // setting access token 
        genrateRefreshTokenAndSetCookie(res, user._id); // setting refresh token

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        genrateTokenAndSetCookie(res, user._id); // setting access token 
        genrateRefreshTokenAndSetCookie(res, user._id); // setting refresh token

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("authToken");
    res.clearCookie("refToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const refreshToken = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};