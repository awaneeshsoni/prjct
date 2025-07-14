import express from "express"
import {  login, signup, updateUser, verifyUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.put("/user", authMiddleware , updateUser);
router.get("/verify", authMiddleware , verifyUser);

export default router;
