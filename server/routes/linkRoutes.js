import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createLink, deleteLink, editLink, getLink, getLinks } from "../controllers/linkController.js";

const router = express.Router();

router.get('/', authMiddleware, getLinks)
router.get('/:id', authMiddleware, getLink)
router.post('/', authMiddleware, createLink)
router.put('/:id', authMiddleware, editLink)
router.delete('/:id', authMiddleware, deleteLink)

export default router;