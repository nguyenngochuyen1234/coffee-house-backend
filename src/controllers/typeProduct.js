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
        return res.status(200).json({ data: { id: randomId }, success: true });
    });
};

export const deleteTypeProduct = (req, res) => {
    // Xóa tất cả sản phẩm có TypeProduct_ID = req.params.id
const deleteProductsQuery = "DELETE FROM product WHERE `TypeProduct_ID`=?";
db.query(deleteProductsQuery, [req.params.id], (err, productData) => {
  if (err) {
    return res.status(500).json(err);
  }

  // Tiếp theo, xóa dòng từ bảng typeproduct
  const deleteTypeProductQuery = "DELETE FROM typeproduct WHERE `TypeProduct_ID`=?";
  db.query(deleteTypeProductQuery, [req.params.id], (err, typeProductData) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Kiểm tra xem có bất kỳ dòng nào bị ảnh hưởng không và trả về phản hồi tương ứng
    if (typeProductData.affectedRows > 0) {
      return res.status(200).json("Type product and related products have been deleted.");
    } else {
      return res.status(403).json("No matching records found to delete.");
    }
  });
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
