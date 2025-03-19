import express from "express";
import { checkAuth, logout, login, signup, refreshToken} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRefToken } from "../middleware/verifyRefToken.js";
const router = express.Router();

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/token/refresh', verifyRefToken, refreshToken)
router.get("/check-auth", verifyToken, checkAuth)


export default router;