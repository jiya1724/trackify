const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workingHourSchema = new Schema({
    emp_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
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
    hour: {
        type: Number,
        required: true,
    },
    minute: {
        type: Number,
        required: true,
    },
    second: {
        type: Number,
        required: true,
    },

});

const WorkingHour = mongoose.model('WorkingHour', workingHourSchema);
module.exports = WorkingHour;
