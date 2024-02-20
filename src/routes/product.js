import express from 'express'
import { addProduct, deleteProduct, getAllProduct, getProductByType, updateProduct } from '../controllers/product.js'


const router = express.Router()

router.get("/product", getAllProduct)
router.post("/product", addProduct)
router.delete("/product/:id", deleteProduct)
router.put("/product", updateProduct)
router.get("/product/getProductByType/:id", getProductByType)

export default router