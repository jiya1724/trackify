// middleware to fetch user
var jwt = require('jsonwebtoken');
require("dotenv").config();
require('dotenv').config();

const JWT_token = process.env.NODE_JWT_TOKEN;

const fetchUser = (req, res, next) => {

    try {
        const googleToken = req.header('google-access-token');
        const authToken = req.header('auth-token')
        if (!authToken) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        const authtokenData = jwt.verify(authToken, JWT_token);
        if (googleToken) {
            const data = {
                ...authtokenData,
                accessToken: googleToken,
            };
            req.user = data;
        } else {
            req.user = authtokenData;
        }


        next();
    } catch (error) {
        console.error(error);
    }

}

module.exports = fetchUser;
