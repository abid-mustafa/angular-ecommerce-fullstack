const express = require('express');
const router = express.Router();
const service = require('../services/order.service');

router.get('/', async (req, res) => {
    try {
        const orders = await service.getOrders(JSON.parse(req.query.limit), JSON.parse(req.query.offset), req.query.customerId);
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting orders.');
    }
});

router.get('/orders-count/:customerId', async (req, res) => {
    try {
        const ordersCount = await service.getOrdersCount(req.params.customerId);
        res.status(200).send(ordersCount);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting orders count.');
    }
});

module.exports = router