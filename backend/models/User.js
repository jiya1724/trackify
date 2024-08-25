const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    
    },
    email: {
        type: String,
        require: true,    
    },
    password: {
        type: String,
        require: true,    
    },
    isActivated:{
        type:Boolean,
        default:false,
    },

   

});
const User = mongoose.model('user', userSchema);
User.createIndexes();
module.exports = User;