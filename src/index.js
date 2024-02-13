import express from "express";
const app = express()
import cors from "cors";
import typeNewsRoutes from "./routes/typeNews.js"
import 'dotenv/config.js'

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api", typeNewsRoutes)
const port = process.env.PORT
app.listen(port, () => {
  console.log("API working!")
})