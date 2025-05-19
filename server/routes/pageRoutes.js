import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPage, deletePage, editPage, getPage, getPages, getPublicPage } from "../controllers/pageController.js";

const router = express.Router();


router.get('/', authMiddleware, getPages)
router.get('/:id', authMiddleware, getPage)
router.get('/public/:slug', getPublicPage)
router.post('/', authMiddleware, createPage)
router.put('/:id', authMiddleware, editPage)
router.delete('/:id', authMiddleware, deletePage)

export default router;