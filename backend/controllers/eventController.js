const db = require("../models/db");

// GET all events
exports.getAllEvents = (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET all events by location
exports.getEventsByLocation = (req, res) => {
    const location = req.query.location;
    db.all("SELECT * FROM events WHERE location = ?", [location], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET ticket types for a specific event
exports.getTicketsByEvent = (req, res) => {
    const eventId = req.params.id;
    db.all("SELECT * FROM tickets WHERE eventID = ?", [eventId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// POST create a new event
exports.createEvent = (req, res) => {
    const { name, category, location, date, lon, lat, description } = req.body;
    db.run(
        `INSERT INTO events (name, category, location, date, lon, lat, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, category, location, date, lon, lat, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Event created", eventId: this.lastID });
        }
    );
};

// PUT update an existing event
exports.updateEvent = (req, res) => {
    const id = req.params.id;
    const { name, category, location, date, lon, lat, description } = req.body;
    db.run(
        `UPDATE events SET name = ?, category = ?, location = ?, date = ?, lon = ?, lat = ?, description = ? WHERE id = ?`,
        [name, category, location, date, lon, lat, description, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Event not found" });
            res.json({ message: "Event updated" });
        }
    );
};

// DELETE remove an event
exports.deleteEvent = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM events WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Event not found" });
        res.json({ message: "Event deleted" });
    });
};
