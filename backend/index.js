const express = require('express');
const app = express();
const cors = require('cors');
const connectTOMongo= require('./db')


app.use(express.json());
app.use(cors());

connectTOMongo();
const PORT = 5000;

app.use('/auth',require('./routes/auth'));
app.use('/emp',require('./routes/emp'));


app.get('/',(req,res)=>{
    res.send('Hello');
})

app.listen(PORT,()=>{
    console.log('Server started on port :' + PORT)
})