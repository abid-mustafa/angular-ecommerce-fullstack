const express = require('express');
const router = express.Router();
const service = require('../services/user.service');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const user = await service.getUserByName(name);

        let hashMatch;
        if (user) {
            hashMatch = await bcrypt.compare(password, user.password);
        }

        if (!hashMatch) {
            const apiResponse = {
                success: false,
            };
            res.send(apiResponse);
        }
        else {
            req.session.userid = user.id;
            req.session.username = user.name;

            const apiResponse = {
                success: true,
                data: {
                    userid: req.session.userid,
                    username: req.session.username
                }
            };

            res.status(200).send(apiResponse);
        }
    } catch (error) {
        res.status(500).send('An error occured while logging in');
    }
});

router.get('/logout', (req, res) => {
    try {
        let apiResponse = {
            success: false
        };

        req.session.destroy((err) => {
            res.clearCookie('connect.sid');

            if (!err) {
                apiResponse.success = true;
                res.status(200).send(apiResponse);
            }
            else {
                throw err;
            }
        });

    } catch (error) {
        res.status(500).send('An error occured while logging out');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const obj = req.body;
        obj.password = await bcrypt.hash(obj.password, 10);
        const data = await service.addUser(obj);

        let apiResponse = {
            success: false,
        };

        if (data.affectedRows === 1) {
            req.session.userid = data.insertId;
            req.session.username = req.body.name;

            apiResponse = {
                success: true,
                data: {
                    userid: data.insertId,
                    username: req.body.name
                }
            };
        }
        res.status(201).send(apiResponse);
    } catch (error) {
        res.status(500).send('An error occured while signing up');
    }
})

module.exports = router