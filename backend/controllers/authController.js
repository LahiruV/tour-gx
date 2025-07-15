const db = require("../models/db");

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        req.session.user = { username: user.username, isAdmin: user.isAdmin };
        res.json({ message: "Login successful", user: req.session.user });
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
};

exports.signup = (req, res) => {
    const { username, password, isAdmin } = req.body;
    db.run("INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)", [username, password, isAdmin], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User registered", userId: this.lastID });
    });
};