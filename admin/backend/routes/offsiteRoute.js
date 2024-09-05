const express = require('express');
const router = express.Router();
const Offsite = require('../models/Offsite'); // Import the Offsite model

// Add a new offsite location
router.post('/add', async (req, res) => {
    try {
        const { name, officeCode, longitude, latitude } = req.body;

        // Create a new offsite location
        const newOffsite = new Offsite({
            name,
            officeCode,
            longitude,
            latitude
        });

        await newOffsite.save();
        res.status(201).json({ message: 'Offsite location added successfully', newOffsite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete an offsite location by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the offsite location
        const offsite = await Offsite.findByIdAndDelete(id);

        if (!offsite) {
            return res.status(404).json({ message: 'Offsite location not found' });
        }

        res.json({ message: 'Offsite location deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an offsite location by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, officeCode, longitude, latitude } = req.body;

        // Find and update the offsite location
        const updatedOffsite = await Offsite.findByIdAndUpdate(id, {
            name,
            officeCode,
            longitude,
            latitude
        }, { new: true });

        if (!updatedOffsite) {
            return res.status(404).json({ message: 'Offsite location not found' });
        }

        res.json({ message: 'Offsite location updated successfully', updatedOffsite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all offsite locations
router.get('/', async (req, res) => {
    try {
        // Find all offsite locations
        const offsites = await Offsite.find();

        res.json(offsites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get an offsite location by ID
router.get('get/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the offsite location by ID
        const offsite = await Offsite.findById(id);

        if (!offsite) {
            return res.status(404).json({ message: 'Offsite location not found' });
        }

        res.json(offsite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
