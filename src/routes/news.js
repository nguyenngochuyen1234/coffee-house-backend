import express from 'express'
import { addNews, getAllNews } from '../controllers/news.js'
import { upload } from '../middleware/multer.js'
const router = express.Router()


router.post("/news",upload.single('image'),addNews)
router.get("/news",getAllNews)


export default router