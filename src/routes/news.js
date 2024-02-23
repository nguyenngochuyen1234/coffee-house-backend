import express from 'express'
import { addNews, deleteNews, getAllNews, getNews, getNewsByTypeName, pagination, updateNews } from '../controllers/news.js'
const router = express.Router()


router.post("/news", addNews)
router.get("/news", getAllNews)
router.put("/news", updateNews)
router.delete("/news/:id", deleteNews)
router.get("/news/getNews/:id", getNews)
router.get("/news/:TypeNews_Name", getNewsByTypeName)
router.get("/news/pagination/data", pagination)


export default router