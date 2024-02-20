import express from 'express'
import { addTypeProduct, deleteTypeProduct, getAllTypeProduct, updateTypeProduct } from '../controllers/typeProduct.js'


const router = express.Router()

router.get("/typeProduct", getAllTypeProduct)
router.post("/typeProduct", addTypeProduct)
router.delete("/typeProduct/:id", deleteTypeProduct)
router.put("/typeProduct", updateTypeProduct)


export default router   