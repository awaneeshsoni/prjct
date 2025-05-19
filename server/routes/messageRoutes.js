import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addMessage, deleteMessage, getMessages } from "../controllers/MessageController.js";


const router = express.Router();

router.get('/', authMiddleware, getMessages)
router.post('/', addMessage)
router.delete('/:id', authMiddleware, deleteMessage)

export default router;