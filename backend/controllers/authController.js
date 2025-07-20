const db = require("../models/db");

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        req.session.user = { email: user.email, isAdmin: user.isAdmin };
        res.json({ message: "Login successful", user: req.session.user });
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
};

exports.signup = (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    if (isAdmin === undefined) {
        isAdmin = true;
    }
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (user) return res.status(400).json({ error: "Email already in use" });

        db.run(
            "INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)",
            [username, email, password, isAdmin],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "User registered", userId: this.lastID });
            }
        );
    });
};