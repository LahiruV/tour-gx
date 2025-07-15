const db = require("../models/db");

exports.bookTicket = (req, res) => {
    const { eventID, ticketType, quantity, username } = req.body;
    if (!eventID || !ticketType || !quantity || !username) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    db.get("SELECT * FROM events WHERE id = ?", [eventID], (err, event) => {
        if (err || !event) return res.status(400).json({ error: "Event not found" });
        const currentDate = new Date().toISOString().slice(2, 10).replace(/-/g, '');
        if (event.date < currentDate) return res.status(400).json({ error: "Event has already passed" });

        db.get("SELECT * FROM tickets WHERE eventID = ? AND ticketType = ?", [eventID, ticketType], (err, ticket) => {
            if (err || !ticket || ticket.availability < quantity) {
                return res.status(400).json({ error: "Insufficient availability or ticket not found" });
            }
            const newAvailability = ticket.availability - quantity;
            db.run("UPDATE tickets SET availability = ? WHERE id = ?", [newAvailability, ticket.id], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                db.run("INSERT INTO bookings (eventID, ticketType, username, quantity) VALUES (?, ?, ?, ?)",
                    [eventID, ticketType, username, quantity],
                    function (err) {
                        if (err) return res.status(500).json({ error: err.message });
                        res.status(201).json({ message: "Booking successful" });
                    });
            });
        });
    });
};