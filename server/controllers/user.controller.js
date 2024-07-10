const express = require('express');
const router = express.Router();
const service = require('../services/user.service');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    const user = await service.getUserByName(name);

    let match;
    if (user) {
        match = await bcrypt.compare(password, user.password);
    }

    if (!match) {
        console.log('bad credentials');
        const apiResponse = {
            success: false,
        };
        res.send(apiResponse);
    }
    else {
        console.log('new session');
        // console.log(JSON.stringify(req.session));
        req.session.userid = user.id;
        req.session.username = user.name;

        const apiResponse = {
            success: true,
            data: {
                userid: req.session.userid,
                username: req.session.username
            }
        };

        console.log(req.sessionID, apiResponse);
        res.send(apiResponse);
    }
});

router.get('/logout', (req, res) => {
    console.log('in /logout');
    let apiResponse = {
        success: false
    };

    try {
        req.session.destroy((err) => {
            console.log('session==>', req.session);
            console.log('err==>', err);
            res.clearCookie('connect.sid');
            if (!err) {
                apiResponse.success = true;
            }
            res.send(apiResponse);
        });
    }
    catch (error) {
        console.log(err);
        res.send(apiResponse);
    }

});

router.post('/signup', async (req, res) => {
    const obj = req.body;
    obj.password = await bcrypt.hash(obj.password, 10);
    const data = await service.addUser(obj);

    if (data.affectedRows == 0) {
        const apiResponse = {
            success: false,
        };
        res.send(apiResponse);
    }
    else {
        req.session.userid = data.insertId;
        req.session.username = req.body.name;

        const apiResponse = {
            success: true,
            data: {
                userid: data.insertId,
                username: req.body.name
            }
        };
        res.send(apiResponse);
    }
})

module.exports = router