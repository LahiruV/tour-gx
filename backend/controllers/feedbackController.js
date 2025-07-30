const db = require("../models/db");

exports.addFeedback = async (req, res) => {
    const { name, email, phone, message, serviceRating } = req.body;
    if (!name || !email || !message || serviceRating === undefined) {
        return res.status(400).json({ error: "Missing feedback details" });
    }
    try {
        const result = await db.run(
            "INSERT INTO feedbacks (name, email, phone, message, serviceRating) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone, message, serviceRating]
        );
        res.status(201).json({ message: "Feedback added successfully", feedbackId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFeedbacks = (req, res) => {
    db.all("SELECT * FROM feedbacks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Feedback ID is required" });
    }
    try {
        await db.run("DELETE FROM feedbacks WHERE id = ?", [id]);
        res.json({ message: "Feedback deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};