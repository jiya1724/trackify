// middleware to fetch user
var jwt = require('jsonwebtoken');
require("dotenv").config();
require('dotenv').config();

const JWT_token = process.env.NODE_JWT_TOKEN;

const fetchUser = (req, res, next) => {

    try {
        const empToken = req.header('emp-token')
        if (!authToken) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        const authtokenData = jwt.verify(authToken, JWT_token);
        req.user = authtokenData;
        next();
    } catch (error) {
        console.error(error);
    }

}

module.exports = fetchUser;
