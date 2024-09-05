const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchEmp = require('../middleware/fetchEmp');
const WorkingHour = require('../models/Hour');
const Employee = require('../models/Emp');
const Leave = require('../models/Leave');


router.post('/requestleave', fetchEmp, async (req, res) => {
    let success=false;
    const { reason } = req.body;
    const dateFrom = {
        day: 4,
        month: 9, 
        year: 2024,
    }
    const dateTo = {
        day: 6,
        month: 9, 
        year: 2024,
    }
    const emp_id = req.user.id;
    

    // if (!emp_id || hour === undefined || minute === undefined || second === undefined) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    

    try {
        // Find a record for today
        let Emp  = await Employee.findById(emp_id);
        if(!Emp){
            res.status(400).json({success,message:"No employee found"})
        }

        const newLeave=new Leave({
            emp_id,
            dateFrom:dateFrom,
            dateTo:dateTo,
            reason:reason,
        })
        await newLeave.save();
        res.status(200).json({success:true,message:"Leave request successfully"});


       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/getleaves', fetchEmp, async (req, res) => {
    let success=false;
    
    let emp_id=req.user.id;
    

    try {
       if(!emp_id){
        res.status(400).json({success,message:"Unauthorized"});
       }

       const leaves= await Leave.find({emp_id:emp_id,status:'pending'});
       res.json(leaves);

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
