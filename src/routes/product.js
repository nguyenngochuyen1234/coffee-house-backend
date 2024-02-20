import express from 'express'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from '../controllers/product.js'


const router = express.Router()

router.get("/product", getAllProduct)
// router.get("/product/:id", getDetailsProduct)
router.post("/product", addProduct)
router.delete("/product/:id", deleteProduct)
router.put("/product", updateProduct)

export default router 