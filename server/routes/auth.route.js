import express from "express";
import { checkAuth, logout, login, signup, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get("/check-auth", verifyToken, checkAuth)


export default router;