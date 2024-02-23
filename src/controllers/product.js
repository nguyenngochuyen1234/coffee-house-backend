import { db } from "../connect.js";


export const getAllProduct = (req, res) => {
    const q = "SELECT * FROM `product` INNER JOIN typeproduct on product.TypeProduct_ID = typeproduct.TypeProduct_ID";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });
}
// export const getDetailsProduct = (req, res) => {
//     const q = "SELECT * from product WHERE idProduct = ?";
//     const values = [
//         req.params.idProduct,
//     ];
//     console.log( req.params.idProduct)
//     db.query(q,(err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json({ data:{ id: req.body.idProduct} });
//     });
// } 

export const addProduct = (req, res) => {
    const randomId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const q = "INSERT INTO product(	idProduct , Product_Name, Product_Image, Product_Price, Product_Description, TypeProduct_ID) VALUES (?, ?, ?, ?,?,?)";
    
    const values = [
        randomId,
        req.body.Product_Name,
        req.body.Product_Image,
        req.body.Product_Price,
        req.body.Product_Description,
        req.body.TypeProduct_Name
    ]
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: randomId }, success: true });
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

export const getProductByType = (req, res) => {

    const q = "SELECT * from product WHERE `TypeProduct_ID`=?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });


}

export const updateProduct = (req, res) => {
    const q = "UPDATE product SET Product_Name = ?, Product_Image = ?, Product_Price = ?, Product_Description = ? WHERE idProduct = ?";
    const values = [
        req.body.Product_Name,
        req.body.Product_Image,
        req.body.Product_Price,
        req.body.Product_Description,
        req.body.idProduct,
    ];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data: { id: req.body.idProduct }, success: true });
    });
};

export const searchProduct = (req, res) => {
    const q = "SELECT * FROM `product` WHERE `Product_Name` LIKE ?";
    const values = `%${req.params.dataSearch}%`; // Thêm % vào giá trị tìm kiếm

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ data });
    });
}

