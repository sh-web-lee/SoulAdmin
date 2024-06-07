import express from 'express';
import { getUserInfo } from '../controllers/user.js';
// import { addPost } from '../controllers/posts.js'
import tokenModdleware from '../middlewares/tokenMiddleware.js'

const router = express.Router();

// router.get('/add', addPost)

router.get('/getUserInfo', tokenModdleware, getUserInfo)

export default router;