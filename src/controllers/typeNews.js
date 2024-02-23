import { db } from "../connect.js";



export const getAllTypeNews = (req, res) => {
    const q = "SELECT * from typenews";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });
}
export const deleteTypeNews = (req, res) => {
    const deleteNewsQuery = "DELETE FROM news WHERE `TypeNews_ID`=?";
    db.query(deleteNewsQuery, [req.params.id], (err, productData) => {
        if (err) {
            return res.status(500).json(err);
        }

        const deleteTypeNewQuery = "DELETE FROM typenews WHERE `TypeNews_ID`=?";
        db.query(deleteTypeNewQuery, [req.params.id], (err, typeNewData) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (typeNewData.affectedRows > 0) {
                return res.status(200).json("Type news and related News have been deleted.");
            } else {
                return res.status(403).json("No matching records found to delete.");
            }
        });
    });

};
export const addTypeNews = (req, res) => {
    const q = "INSERT INTO typenews(`TypeNews_Name`) VALUES (?)";
    const values = [
        req.body.TypeNews_Name,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: data.insertId }, success: true });
    });
};

export const updateTypeNews = (req, res) => {
    const q = "UPDATE typenews SET `TypeNews_Name`=? WHERE TypeNews_ID=?";
    const values = [
        req.body.TypeNews_Name,
        req.body.TypeNews_ID,
    ];
    db.query(q, values, (err, data) => {
        if (err) res.status(500).json({ err, data });
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("Error");
    });
}
