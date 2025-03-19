import express from "express";
import { checkAuth, logout, login, signup, refreshToken} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/token/refresh', refreshToken)
router.get("/check-auth", verifyToken, checkAuth)


export default router;