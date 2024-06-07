import express from 'express'
import cors from 'cors'
import articleRoutes from './routes/article.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import ossRoutes from './routes/oss.js';
import categoryRoutes from './routes/category.js';


const app = express();

app.use(express.json())
app.use(cors())


app.use('/api/article', articleRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/aliyun', ossRoutes)
app.use('/api/category', categoryRoutes)

app.listen(8080, () => {
  console.log('server running: 8080')
})