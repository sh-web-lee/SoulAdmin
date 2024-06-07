import express from 'express';
import { addPost } from '../controllers/posts.js'

const router = express.Router();

router.get('/add', addPost)

export default router;