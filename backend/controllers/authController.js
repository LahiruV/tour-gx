const db = require("../models/db");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        try {
            const userData = await exports.getUser(email);
            req.session.user = {
                email: userData.email,
                name: userData.name,
                isAdmin: userData.isAdmin
            };
            res.json({ message: "Login successful", user: req.session.user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

exports.getUser = (email) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
};

exports.signup = (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    if (isAdmin === undefined) {
        isAdmin = true;
    }
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (user) return res.status(400).json({ error: "Email already in use" });

        db.run(
            "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
            [name, email, password, isAdmin],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "User registered", userId: this.lastID });
            }
        );
    });
};