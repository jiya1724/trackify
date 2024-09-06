const express = require('express');
const app = express();
const cors = require('cors');
const connectTOMongo= require('./db')


app.use(express.json());
app.use(cors());

connectTOMongo();
const PORT = 6000;
app.use('/admin',require('./routes/adminRoute'));
app.use('/offsite', require('./routes/offsiteRoute'));


app.listen(PORT,()=>{
    console.log('Server started on port :' + PORT)
})