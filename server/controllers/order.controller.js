const express = require('express');
const router = express.Router();
const service = require('../services/order.service');

router.get('/', async (req, res) => {
    try {
        const orders = await service.getOrdersByCustomerId(JSON.parse(req.query.limit), JSON.parse(req.query.offset), req.query.customerId);
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting orders.');
    }
});

router.get('/orders-count/:customerId', async (req, res) => {
    try {
        const ordersCount = await service.getOrdersCountByCustomerId(req.params.customerId);
        res.status(200).send(ordersCount);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting orders count.');
    }
});

router.post('/', async (req, res) => {
    try {
        const orderLines = req.body.orderLines;
        const outOfStock = [];

        for (let line of orderLines) {
            const stock = await service.getQuantity(line.productId);

            if (line.quantity > stock.quantity) {
                outOfStock.push(stock.name);
            }
        }

        console.log('outOfStock==>', outOfStock);
        if (outOfStock.length > 0) {
            const apiResponse = {
                success: false,
                data: outOfStock
            };
            console.log(apiResponse);
            res.send(apiResponse);
        }
        else {
            await service.addOrder(req.body);
            const apiResponse = {
                success: true,
            };
            console.log(apiResponse);
            res.status(201).send(apiResponse);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while placing order.');
    }
});

router.get('/get-quantity/:productId', async (req, res) => {
    try {
        const stock = await service.getQuantity(req.params.productId);
        res.status(200).send(JSON.stringify(stock.quantity));
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while adding to cart.');
    }
});

module.exports = router