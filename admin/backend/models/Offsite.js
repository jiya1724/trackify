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
    latitiude:{
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('Offsite', offsiteSchema);
