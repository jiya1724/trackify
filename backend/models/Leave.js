const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    emp_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    dateFrom: {
        day: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    dateTo: {
        day: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default:'pending',
    },
    

});

const Leave = mongoose.model('Leave', LeaveSchema);
module.exports = Leave;
