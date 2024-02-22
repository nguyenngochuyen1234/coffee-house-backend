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
        req.body.News_Image,
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
    const q = "SELECT * FROM `news` INNER JOIN `typenews` on `news`.`TypeNews_ID` = `typenews`.`TypeNews_ID`";

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
    const q = "UPDATE news SET News_Title = ?, News_Time = ?, News_Image = ?, News_Description = ?, TypeNews_ID = ?, News_Content = ? WHERE News_ID = ?";

    const values = [
        req.body.News_Title,
        convertDate(),
        req.body.News_Image,
        req.body.News_Description,
        req.body.TypeNews_ID,
        req.body.News_Content,
        req.body.News_ID,
    ];

    console.log({ values });

    db.query(q, values, (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Check if the update was successful and affected rows
            if (data.affectedRows > 0) {
                // Fetch the updated data after the update operation
                const selectQuery = "SELECT * FROM `news` INNER JOIN `typenews` on `news`.`TypeNews_ID` = `typenews`.`TypeNews_ID`  WHERE News_ID = ?";
                db.query(selectQuery, [req.body.News_ID], (selectErr, selectData) => {
                    if (selectErr) {
                        res.status(500).json({ error: selectErr.message });
                    } else {
                        // Send the updated data as a response
                        res.json({ data: selectData[0] });
                    }
                });
            } else {
                res.status(403).json("Error: No rows affected by the update.");
            }
        }
    });
};


export const deleteNews = (req, res) => {
    const q =
        "DELETE FROM news WHERE `News_ID`=?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("News has been deleted.");
        return res.status(403).json("error")
    });
}

export const getNewsByTypeName = (req, res) => {

    const q = "SELECT * FROM `news` INNER JOIN typenews on news.TypeNews_ID = typenews.TypeNews_ID WHERE typenews.TypeNews_Name = ?";

    db.query(q, [req.params.TypeNews_Name], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });
}

export const pagination = (req, res) => {
    const { page, pageSize, typeNews } = req.query;
    const offset = (page - 1) * pageSize;
    const query = `SELECT news.*, typenews.TypeNews_Name, total_count.total_news_count FROM news INNER JOIN typenews ON news.TypeNews_ID = typenews.TypeNews_ID INNER JOIN ( SELECT COUNT(*) AS total_news_count FROM news INNER JOIN typenews ON news.TypeNews_ID = typenews.TypeNews_ID WHERE typenews.TypeNews_Name = ? ) AS total_count ON 1=1 WHERE typenews.TypeNews_Name = ? LIMIT ${pageSize} OFFSET ${offset}`;

    db.query(query, [typeNews, typeNews], (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({data});
        }
    })
}






