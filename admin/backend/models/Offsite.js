const mongoose = require('mongoose');
const { Schema } = mongoose;

const offsiteSchema= new Schema({
    name: {
        type: String,
        require: true,
    },
    officeCode:{
        type: String,
        require:true,
    },
    longitude: {
        type: Number,
        require: true,    
    },
    latitude:{
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('Offsite', offsiteSchema);
