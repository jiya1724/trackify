const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Emp');
const fetchEmp = require('../middleware/fetchEmp');


const JWT_SECRET = 'SIH2024'; // Replace this with your own secret key

router.post('/createemp', async (req, res) => {
    try {
        const { userName, password, pin, image } = req.body;
        let success = false;
        // Check if the user exists by username
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success, message: 'User not found by username' });
        }

        

        if (user) {
            if (user.isActivated) {
                return res.status(400).json({ success, message: 'Employeee Already created' });

            }
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success, message: 'Invalid password' });
        }

        // Create the employee
        const newEmployee = new Employee({
            name:user.name,
            image,
            pin,
            userName,
            password,
        });

        await newEmployee.save();

        user.isActivated = true;
        await user.save(); // Save the updated user

        // Generate JWT with the user's ID
        const token = jwt.sign({ id: newEmployee._id }, JWT_SECRET);

        res.status(201).json({
            success: true,
            token // Send the JWT token in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { userName, pin } = req.body;
        let success = false;

        // Check if the employee exists by username
        const employee = await Employee.findOne({ userName });
        if (!employee) {
            return res.status(404).json({ success, message: 'Employee not found' });
        }

        // Check if the password is correct
        const matchPin = employee.pin;
        console.log(matchPin)
        console.log(pin)

        if (matchPin === pin) {
            const token = jwt.sign({ id: employee.id }, JWT_SECRET);
            res.status(200).json({
                success: true,
                token, // Send the JWT token in the response
            });

        } else {
            return res.status(404).json({ success, message: 'Invalid username or Pin' });
        }

        // Generate JWT with the employee's ID



    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



router.post('/getemp', fetchEmp, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await Employee.findById(userId);
        res.json(user);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;
