import { db } from "../connect.js";


export const getAllTypeProduct = (req, res) => {
    const q = "SELECT * from typeproduct";

    db.query(q,(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data});
    });

}

export const addTypeProduct = (req, res) => {
    const randomId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const q = "INSERT INTO typeproduct(TypeProduct_ID, TypeProduct_Name, TypeProduct_Img) VALUES (?, ?, ?)";

    const values = [
        randomId,
        req.body.TypeProduct_Name,
        req.body.TypeProduct_Img
    ]
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: data.insertId }, success: true });
    });
};

export const deleteTypeProduct = (req, res) => {
    const q =
    "DELETE FROM typeproduct WHERE `TypeProduct_ID`=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if(data.affectedRows>0) return res.status(200).json("Type product has been deleted.");
    return res.status(403).json("error")
  });

}

export const updateTypeProduct = (req, res) => {
    const q = "UPDATE typeproduct SET TypeProduct_Name = ?, TypeProduct_Img = ? WHERE TypeProduct_ID = ?";

    const values = [
        req.body.TypeProduct_Name,
        req.body.TypeProduct_Img,
        req.body.TypeProduct_ID
    ];  

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: req.body.TypeProduct_ID }, success: true });
    });
};
