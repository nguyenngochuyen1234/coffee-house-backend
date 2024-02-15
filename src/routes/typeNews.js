import express from 'express'
import { addTypeNews, deleteTypeNews, getAllTypeNews, updateTypeNews } from '../controllers/typeNews.js'
const router = express.Router()


router.get("/typeNews", getAllTypeNews)
router.post("/typeNews",addTypeNews)
router.delete("/typeNews/:id",deleteTypeNews)
router.put("/typeNews",updateTypeNews)


export default router