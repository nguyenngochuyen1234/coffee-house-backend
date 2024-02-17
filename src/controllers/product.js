import { db } from "../connect.js";


export const getAllProduct = (req, res) => {
    const q = "SELECT * from product";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });

}

export const addProduct = (req, res) => {
    const randomId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const q = "INSERT INTO product(	idProduct , Product_Name, Product_Image, Product_Price, Product_Description, TypeProduct_ID) VALUES (?, ?, ?, ?,?,?)";

    const values = [
        randomId,
        req.body.Product_Name,
        req.body.Product_Image,
        req.body.Product_Price,
        req.body.Product_Description,
        req.body.TypeProduct_ID
    ]
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: data.insertId }, success: true });
    });
};

export const deleteProduct = (req, res) => {
    const q =
        "DELETE FROM product WHERE `idProduct`=?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json(" product has been deleted.");
        return res.status(403).json("error")
    });

}

export const updateProduct = (req, res) => {
    // const q = "UPDATE product SET Product_Name = ?, Product_Img = ? WHERE Product_ID = ?";

    // const values = [
    //     req.body.Product_Name,
    //     req.body.Product_Img,
    //     req.body.Product_ID
    // ];

    // db.query(q, values, (err, data) => {
    //     if (err) return res.status(500).json(err);
    //     return res.status(200).json({ data: { id: req.body.Product_ID }, success: true });
    // });
};
