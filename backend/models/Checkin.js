const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkinSchema = new Schema({

    emp_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
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

const checkin = mongoose.model('checkin', checkinSchema);
module.exports = checkin;
