const mongoose = require('mongoose');
const { Schema } = mongoose;

const offsiteAttendanceSchema = new Schema({
    emp_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    locationName: {
        type: String,
        required: true,  // Make sure 'required' is correctly spelled
    },
    offsiteStatus: {
        type: String,
        required: true,
    },
    latestCheckin: {
        type: Date,
    },
    latestCheckout: {
        type: Date,
    },
    date: {
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
});

const OffsiteAttendance = mongoose.model('OffsiteAttendance', offsiteAttendanceSchema);
module.exports = OffsiteAttendance;
