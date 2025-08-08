const db = require("../models/db");

exports.bookTicket = async (req, res) => {
    const {
        packageId,
        firstName,
        lastName,
        email,
        phone,
        travelDate,
        adults,
        children,
        mealPlan,
        includeTransport,
        includeAccommodation,
        specialRequests
    } = req.body;

    if (!packageId || !firstName || !lastName || !email || !phone || !travelDate || adults == null || children == null || !mealPlan || includeTransport == null || includeAccommodation == null) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    try {
        const result = await db.run(
            `INSERT INTO bookings (
                packageId, firstName, lastName, email, phone, travelDate,
                adults, children, mealPlan, includeTransport, includeAccommodation, specialRequests
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                packageId, firstName, lastName, email, phone, travelDate,
                adults, children, mealPlan, includeTransport ? 1 : 0, includeAccommodation ? 1 : 0, specialRequests || null
            ]
        );
        res.status(201).json({ message: "Booking successful", bookingId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    const query = `
        SELECT
            b.*, 
            p.title AS packageTitle,
            p.description AS packageDescription,
            p.image AS packageImage,
            p.price AS packagePrice
        FROM bookings b
        LEFT JOIN packages p ON b.packageId = p.id
        ORDER BY b.id DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const {
        packageId,
        firstName,
        lastName,
        email,
        phone,
        travelDate,
        adults,
        children,
        mealPlan,
        includeTransport,
        includeAccommodation,
        specialRequests
    } = req.body;

    if (!id || !packageId || !firstName || !lastName || !email || !phone || !travelDate || adults == null || children == null || !mealPlan || includeTransport == null || includeAccommodation == null) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    try {
        await db.run(
            `UPDATE bookings SET
                packageId = ?, firstName = ?, lastName = ?, email = ?, phone = ?, travelDate = ?,
                adults = ?, children = ?, mealPlan = ?, includeTransport = ?, includeAccommodation = ?, specialRequests = ?
             WHERE id = ?`,
            [
                packageId, firstName, lastName, email, phone, travelDate,
                adults, children, mealPlan, includeTransport ? 1 : 0, includeAccommodation ? 1 : 0, specialRequests || null, id
            ]
        );
        res.json({ message: "Booking updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Booking ID is required" });

    try {
        await db.run("DELETE FROM bookings WHERE id = ?", [id]);
        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
