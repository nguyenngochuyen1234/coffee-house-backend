import express from "express";
const app = express()
import cors from "cors";
import typeNewsRoutes from "./routes/typeNews.js"

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

app.use("/api", typeNewsRoutes)
app.listen(8800, ()=>{
    console.log("API working!")
})