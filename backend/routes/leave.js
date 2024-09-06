const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchEmp = require('../middleware/fetchEmp');
const WorkingHour = require('../models/Hour');
const Employee = require('../models/Emp');
const Leave = require('../models/Leave');

// Request Leave Route
router.post('/requestleave', fetchEmp, async (req, res) => {
    let success = false;
    const { reason, dateFrom, dateTo } = req.body;  // Assuming you're getting these from the frontend now
    const emp_id = req.user.id;

    if (!reason || !dateFrom || !dateTo) {
        return res.status(400).json({ success, message: 'Missing required fields' });
    }

    try {
        // Find employee by id
        let emp = await Employee.findById(emp_id);
        if (!emp) {
            return res.status(400).json({ success, message: "No employee found" });
        }

        // Create a new leave request
        const newLeave = new Leave({
            emp_id,
            dateFrom,
            dateTo,
            reason,
            status: 'pending' // Default status
        });

        await newLeave.save();
        success = true;
        res.status(200).json({ success, message: "Leave request submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success, message: 'Server error' });
    }
});

// Get Employee's Leaves
router.post('/getleaves', fetchEmp, async (req, res) => {
    let success = false;
    const emp_id = req.user.id;

    if (!emp_id) {
        return res.status(400).json({ success, message: "Unauthorized" });
    }

    try {
        const leaves = await Leave.find({ emp_id, status: 'pending' });
        if (leaves.length === 0) {
            return res.status(200).json({ success, message: "No pending leave requests" });
        }
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success, message: 'Server error' });
    }
});

// Get All Pending Leave Requests (Admin/Manager)
router.post('/getallLeaves', async (req, res) => {
    try {
        const leaves = await Leave.find({ status: 'pending' }).populate('emp_id', 'name');  // Populating employee name
        if (leaves.length === 0) {
            return res.status(200).json({ success: true, message: "No pending leave requests" });
        }
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Leave Request Status
router.post('/updatestatus/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Validate status
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find and update the leave request
        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.json({ success: true, leave: updatedLeave });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
