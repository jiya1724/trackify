const express = require('express');
const router = express.Router();


router.post('/whatsappwebhook', async (req, res) => {
    const accountSid = 'AC1d5a628254e48dc9f36a94184bc6239d';
    const authToken = '30ed71f783ca853c43bd98fefc7c7837';
    const client = require('twilio')(accountSid, authToken);

    client.conversations.v1.conversations('CH16fb0285b2954938820a46221c33d5a7')
        .messages
        .create({ author: 'system', body: 'byee' })
        .then(message => console.log(message.sid));
});



module.exports = router;
