const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema= new Schema({
    name: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    
    },
    officeCode:{
        type: String,
        require:true,
    },
    password: {
        type: String,
        require: true,    
    },
})

module.exports = mongoose.model('Admin', adminSchema);
