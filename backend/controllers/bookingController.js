const db = require("../models/db");

// CREATE
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
        specialRequests,
        status = 'pending' // Default status
    } = req.body;

    if (
        !packageId || !firstName || !lastName || !email || !phone || !travelDate ||
        adults == null || children == null || !mealPlan ||
        includeTransport == null || includeAccommodation == null
    ) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    try {
        const result = await db.run(
            `INSERT INTO bookings (
                packageId, firstName, lastName, email, phone, travelDate,
                adults, children, mealPlan, includeTransport, includeAccommodation,
                specialRequests, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                packageId, firstName, lastName, email, phone, travelDate,
                adults, children, mealPlan,
                includeTransport ? 1 : 0,
                includeAccommodation ? 1 : 0,
                specialRequests || null,
                status
            ]
        );
        res.status(201).json({ message: "Booking successful", bookingId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ (GET all bookings with package info)             p.image AS packageImage,
exports.getAllBookings = async (req, res) => {
    const query = `
        SELECT
            b.*, 
            p.title AS packageTitle,
            p.description AS packageDescription,
            p.price AS packagePrice,
            p.image AS packageImage,
            (b.adults * CAST(p.price AS REAL) + b.children * CAST(p.price AS REAL) / 2) AS totalPrice
        FROM bookings b
        LEFT JOIN packages p ON b.packageId = p.id
        ORDER BY b.id DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


// UPDATE
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
        specialRequests,
        status
    } = req.body;

    if (
        !id || !packageId || !firstName || !lastName || !email || !phone || !travelDate ||
        adults == null || children == null || !mealPlan ||
        includeTransport == null || includeAccommodation == null || !status
    ) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    try {
        await db.run(
            `UPDATE bookings SET
                packageId = ?, firstName = ?, lastName = ?, email = ?, phone = ?, travelDate = ?,
                adults = ?, children = ?, mealPlan = ?, includeTransport = ?, includeAccommodation = ?,
                specialRequests = ?, status = ?
             WHERE id = ?`,
            [
                packageId, firstName, lastName, email, phone, travelDate,
                adults, children, mealPlan,
                includeTransport ? 1 : 0,
                includeAccommodation ? 1 : 0,
                specialRequests || null,
                status,
                id
            ]
        );
        res.json({ message: "Booking updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ error: "Missing booking ID or status" });
    }

    try {
        await db.run("UPDATE bookings SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: "Booking status updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
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
