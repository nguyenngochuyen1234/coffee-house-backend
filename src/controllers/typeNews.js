import { db } from "../connect.js";

export const getAllTypeNews = (req, res) => {
    const q = "SELECT * from typeNews";

    db.query(q,(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data});
    });
}
export const deleteTypeNews = (req, res) => {
      const q =
        "DELETE FROM typeNews WHERE `TypeNews_ID`=?";
  
      db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.affectedRows>0) return res.status(200).json("TypeNews has been deleted.");
        return res.status(403).json("error")
      });
  };
export const addTypeNews = (req, res) => {
    const q = "INSERT INTO typenews(`TypeNews_Name`) VALUES (?)";
    const values = [
        req.body.TypeNews_Name,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({data:{id:data.insertId}, success:true});
    });
};

export const updateTypeNews = (req, res) => {
    const q = "UPDATE typeNews SET `TypeNews_Name`=? WHERE TypeNews_ID=?";
    const values = [
        req.body.TypeNews_Name,
        req.body.TypeNews_ID,
    ];
    db.query(q, values, (err, data) => {
        if (err) res.status(500).json({err, data});
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("Error");
    });
}
