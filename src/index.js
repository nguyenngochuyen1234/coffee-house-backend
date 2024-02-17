import express from "express";

const app = express()
import cors from "cors";
import typeNewsRoutes from "./routes/typeNews.js"
import newsRoutes from "./routes/news.js"
import uploadRoutes from "./routes/upload.js"
import typeProductRoutes from "./routes/typeProduct.js"
import productRoutes from "./routes/product.js"
import 'dotenv/config.js'

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.static('public'))

app.use("/api", typeNewsRoutes)
app.use("/api", newsRoutes)
app.use("/api", uploadRoutes)
app.use("/api", typeProductRoutes)
app.use("/api", productRoutes)



const port = process.env.PORT
app.listen(port, () => {
  console.log("API working!")
})