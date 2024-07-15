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
        if (user && user.isAdmin) {
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
        console.log(req.session);
        console.log(error);
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
        console.log(error);
        res.status(500).send('An error occured while logging out');
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await service.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting users');
    }
});

module.exports = router