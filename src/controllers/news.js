import { db } from "../connect.js";



export const addNews = (req, res) => {
    const filename = req.file;
    console.log(filename)
    console.log(req.body)
};

export const getAllNews = (req, res) => {
    res.send("hello")
};
