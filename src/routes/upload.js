import express from 'express'
import { upload } from '../middleware/multer.js'
import { addNewsImage } from '../controllers/upload.js'
const router = express.Router()


router.post("/upload", upload.single('image'), addNewsImage)


export default router