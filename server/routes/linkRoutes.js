import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createLink, deleteLink, editLink, getLink, getLinks, trackLinkClick } from "../controllers/linkController.js";

const router = express.Router();

router.get('/', authMiddleware, getLinks)
router.get('/:id', authMiddleware, getLink)
router.post('/', authMiddleware, createLink)
router.put('/:id', authMiddleware, editLink)
router.delete('/:id', authMiddleware, deleteLink)
router.get('/track/:id', trackLinkClick);

export default router;