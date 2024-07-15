const express = require('express');
const router = express.Router();
const service = require('../services/chat.service');

router.get('/get-rooms', async (req, res) => {
    try {
        const rooms = await service.getChatRooms();
        res.status(200).send(rooms);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting rooms.');
    }
});

router.get('/:room', async (req, res) => {
    try {
        const chat = await service.getChat(req.params.room);
        res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting chat.');
    }
});


router.post('/', async (req, res) => {
    try {
        console.log('in here', req.body);
        const chat = await service.addChat(req.body);
        res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting chat.');
    }
});

module.exports = router