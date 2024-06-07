import express from 'express'
import tokenModdleware from '../middlewares/tokenMiddleware.js'
import { getCategoryList } from '../controllers/category.js'

const router = express.Router();


router.get('/list', tokenModdleware, getCategoryList);

export default router;