// middleware to fetch user
var jwt = require('jsonwebtoken');
require("dotenv").config();
require('dotenv').config();

const JWT_token = 'SIH2024';

const fetchEmp = (req, res, next) => {

    try {
        const empToken = req.header('auth-token')
        if (!empToken) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        const authtokenData = jwt.verify(empToken, JWT_token);
        req.user = authtokenData;
        next();
    } catch (error) {
        console.error(error);
    }

}

module.exports = fetchEmp;
