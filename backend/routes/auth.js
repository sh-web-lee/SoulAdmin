import express from 'express';
// import { addPost } from '../controllers/posts.js'
import { register, login, logout } from '../controllers/auth.js'

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router;