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

exports.getUser = async (email) => {
    try {
        const row = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        return row;
    } catch (err) {
        throw err;
    }
};

exports.logout = async (req, res) => {
    await new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if (err) return reject(err);
            resolve();
        });
    });
    res.json({ message: "Logged out" });
};

exports.signup = async (req, res) => {
    let { name, email, password, isAdmin } = req.body;
    if (isAdmin === undefined) {
        isAdmin = true;
    }
    try {
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        if (user) return res.status(400).json({ error: "Email already in use" });

        await new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
                [name, email, password, isAdmin],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};