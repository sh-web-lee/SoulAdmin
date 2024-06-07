import express from 'express'
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import { addArticle, getArticles } from '../controllers/article.js';

const router = express.Router();


router.post('/add', tokenMiddleware, addArticle)
router.get('/list', getArticles)

export default router;