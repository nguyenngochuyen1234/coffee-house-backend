
export const addNewsImage = (req, res) => {
    const filename = req.file.filename;
    res.json({ filename: filename, message: 'File uploaded successfully' });
};

