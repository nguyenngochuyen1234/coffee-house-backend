import express from 'express'
import { addProduct, deleteProduct, getAllProduct, getProductByType, searchProduct, updateProduct } from '../controllers/product.js'


const router = express.Router()

router.get("/product", getAllProduct)
// router.get("/product/:id", getDetailsProduct)
router.post("/product", addProduct)
router.delete("/product/:id", deleteProduct)
router.put("/product", updateProduct)
router.get("/product/getProductByType/:id", getProductByType)
router.get("/product/search/:dataSearch", searchProduct)

export default router 