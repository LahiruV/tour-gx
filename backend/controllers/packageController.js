const db = require("../models/db");

exports.addPackage = async (req, res) => {
    const { title, description, image, price, duration, groupSize, startDate } = req.body;
    if (!title || !description || !image || !price || !duration || !groupSize || !startDate) {
        return res.status(400).json({ error: "Missing package details" });
    }
    try {
        const result = await db.run(
            "INSERT INTO packages (title, description, image, price, duration, groupSize, startDate, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, 1)",
            [title, description, image, price, duration, groupSize, startDate]
        );
        res.status(201).json({ message: "Package added successfully", packageId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPackages = (req, res) => {
    db.all("SELECT * FROM packages WHERE isActive = 1", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.updatePackage = async (req, res) => {
    const { id, title, description, image, price, duration, groupSize, startDate } = req.body;
    if (!id || !title || !description || !image || !price || !duration || !groupSize || !startDate) {
        return res.status(400).json({ error: "Missing package details" });
    }
    try {
        await db.run("UPDATE packages SET title = ?, description = ?, image = ?, price = ?, duration = ?, groupSize = ?, startDate = ? WHERE id = ?",
            [title, description, image, price, duration, groupSize, startDate, id]);
        res.json({ message: "Package updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Package ID is required" });
    }
    try {
        await db.run("UPDATE packages SET isActive = 0 WHERE id = ?", [id]);
        res.json({ message: "Package deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
