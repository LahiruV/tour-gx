const fs = require('fs');

// Controller function — receives req/res, multer handled in route
exports.convertImageToBase64 = (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    fs.readFile(file.path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading uploaded file.' });
        }

        const base64Image = data.toString('base64');

        // Optional: clean up temp file
        fs.unlink(file.path, () => { });

        res.json(base64Image);
    });
};