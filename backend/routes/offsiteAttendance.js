const express = require('express');
const router = express.Router();
const OffsiteAttendance = require('../models/OffsiteAttendance');
const jwt = require('jsonwebtoken');
const fetchEmp = require('../middleware/fetchEmp');

// POST route to handle manual check-in and check-out
router.post('/checkin',fetchEmp, async (req, res) => {
    try {
        const { locationName, isCheckedIn } = req.body;
        const currentDate = new Date();
        emp_id=req.user.id;
        

      

        // Find the existing record for the employee for today
        let attendanceRecord = await OffsiteAttendance.findOne({
            emp_id,
            'date.day': currentDate.getDate(),
            'date.month': currentDate.getMonth() + 1,
            'date.year': currentDate.getFullYear(),
        });

        if (!attendanceRecord) {
            // If no record exists, create a new one
            attendanceRecord = new OffsiteAttendance({
                emp_id,
                locationName: locationName,
                offsiteStatus: isCheckedIn ? 'Checked In' : 'Checked Out',
                latestCheckin: isCheckedIn ? currentDate : null,
                latestCheckout: !isCheckedIn ? currentDate : null,
                date: {
                    day: currentDate.getDate(),
                    month: currentDate.getMonth() + 1,
                    year: currentDate.getFullYear(),
                },
            });
        } else {
            // If a record exists, update it
            if (isCheckedIn) {
                attendanceRecord.latestCheckin = currentDate;
                attendanceRecord.offsiteStatus = 'Checked In';
            } else {
                attendanceRecord.latestCheckout = currentDate;
                attendanceRecord.offsiteStatus = 'Checked Out';
            }
        }

        // Save the record to the database
        await attendanceRecord.save();
        
        // Respond with success
        res.status(200).json({ message: 'Attendance updated successfully', attendanceRecord });
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
