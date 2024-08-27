const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/createuser', async (req, res) => {
    const { name, email, userName, password } = req.body;

    try {
        // Check if the user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Check if the username is already taken
        user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "Username already taken" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        user = await User.create({
            name,
            email,
            userName,
            password: hashedPassword
        });

        // Respond with user details and hashed password
        res.status(201).json({
            message: "User created successfully",
            ...user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
