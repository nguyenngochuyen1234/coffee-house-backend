import { db } from "../connect.js";
import { convertDate } from "../middleware/convertDate.js";
import { convertString } from "../middleware/covertString.js";



export const addNews = (req, res) => {
    const q = "INSERT INTO news (News_ID, News_Title, News_Time, News_Image, News_Description, TypeNews_ID, News_Content) VALUES (?, ?, ?, ?, ?, ?,?)";
    let id = convertString(req.body.News_Title)
    const values = [
        id,
        req.body.News_Title,
        convertDate(),
        `http://localhost:8800/uploads/${req.body.News_Image}`,
        req.body.News_Description,
        req.body.TypeNews_Name,
        req.body.News_Content,
    ];
    console.log(values)
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: data.insertId }, success: true });
    });
};
export const getAllNews = (req, res) => {
    const q = "SELECT * from news";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });
};

export const getNews = (req, res) => {
    const q =
        "SELECT * FROM news WHERE `News_ID`=?";
    console.log(req.params.id)
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });

}

export const updateNews = (req, res) => {
    res.send("hello")
}

export const deleteNews = (req, res) => {
    res.send("hello")
}






