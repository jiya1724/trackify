const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');


const JWT_SECRET = 'SIH_24'; // Replace this with your own secret key

router.post('/createadmin', async (req, res) => {
    try {
        const { name, userName, officeCode, password } = req.body;

        // Check if the admin already exists
        let admin = await Admin.findOne({ userName });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        admin = new Admin({
            name,
            userName,
            officeCode,
            password: hashedPassword,
        });

        await admin.save();

        // Generate JWT
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { officeCode, password } = req.body;
        let success = false;

        // Check if the admin exists by username
        const admin = await Admin.findOne({ officeCode});
        if (!admin) {
            return res.status(404).json({ success, message: 'Admin not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success, message: 'Invalid password' });
        }

        // Generate JWT with the admin's ID
        const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            token, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
