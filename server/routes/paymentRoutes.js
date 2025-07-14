import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { Checkout,Webhook } from "../controllers/payController.js";

const router = express.Router();

router.post('/create-checkout', authMiddleware, Checkout)
router.post('/webhook', Webhook)

export default router;