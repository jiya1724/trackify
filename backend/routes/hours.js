const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Employee = require('../models/Emp');
const fetchEmp = require('../middleware/fetchEmp');
const checkin = require('../models/Checkin');


router.post('/updateworking', fetchEmp, async (req, res) => {
    const { hour, minute, second } = req.body;
    const emp_id = req.user.id;
    const getCurrentDate = () => {
        const now = new Date();
        return {
            day: now.getDate(),
            month: now.getMonth() + 1, // Month is zero-indexed
            year: now.getFullYear(),
        };
    };

    // if (!emp_id || hour === undefined || minute === undefined || second === undefined) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    const currentDate = getCurrentDate();

    try {
        // Find a record for today
        let workingHourRecord = await WorkingHour.findOne({ emp_id, date: currentDate });


        if (workingHourRecord) {
            workingHourRecord.hour += hour;
            workingHourRecord.minute += minute;
            workingHourRecord.second += second;

            // Adjust for overflow in seconds and minutes
            if (workingHourRecord.second >= 60) {
                workingHourRecord.minute += Math.floor(workingHourRecord.second / 60);
                workingHourRecord.second %= 60;
            }

            if (workingHourRecord.minute >= 60) {
                workingHourRecord.hour += Math.floor(workingHourRecord.minute / 60);
                workingHourRecord.minute %= 60;
            }

            await workingHourRecord.save();
            return res.status(200).json({ message: 'Working hours updated', data: workingHourRecord });

            console.log("found")
        } else {
            console.log(currentDate)
            console.log("Not found")
            // If no record exists for today, create a new one
            const newWorkingHour = new WorkingHour({
                emp_id,
                date: currentDate,
                hour,
                minute,
                second
            });

            await newWorkingHour.save();
            return res.status(201).json({ message: 'New working hour record created', data: newWorkingHour });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/setcheckin', fetchEmp, async (req, res) => {
    try {
        const empId = req.user.id; // Assuming employee id is stored in req.employee by fetchEmp middleware
        const now = new Date();
        const { isCheckin } = req.body; // Expecting the request body to tell us if it's a check-in or check-out

        // Get the current date components
        const currentDate = {
            day: now.getDate(),
            month: now.getMonth() + 1, // Month is zero-indexed, so we add 1
            year: now.getFullYear(),
        };

        // Find if there is already a check-in/check-out record for the current employee and date
        const existingCheckin = await checkin.findOne({
            emp_id: empId,
            'date.day': currentDate.day,
            'date.month': currentDate.month,
            'date.year': currentDate.year,
        });

        if (!existingCheckin) {
            // No record exists for today, create a new one
            const newCheckin = new checkin({
                emp_id: empId,
                latestCheckin: isCheckin ? now : null,  // Set check-in time if check-in
                latestCheckout: !isCheckin ? now : null, // Set check-out time if check-out
                date: currentDate  // Store the current date (day, month, year)
            });

            await newCheckin.save();
            return res.status(200).json({ success: true, message: `Check-${isCheckin ? 'in' : 'out'} recorded for today.` });
        } else {
            // Update either the latestCheckin or latestCheckout
            if (isCheckin) {
                existingCheckin.latestCheckin = now;  // Update the check-in time to the latest time
            } else {
                existingCheckin.latestCheckout = now;  // Update the check-out time to the latest time
            }

            await existingCheckin.save();
            return res.status(200).json({ success: true, message: `Check-${isCheckin ? 'in' : 'out'} time updated for today.` });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});



module.exports = router;
