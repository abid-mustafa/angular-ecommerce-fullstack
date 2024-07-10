const express = require('express');
const router = express.Router();
const service = require('../services/order.service');

router.get('/:customerId', async (req, res) => {
    const items = await service.getOrdersByCustomerId(req.params.customerId);
    if (items === undefined)
        res.status(404).send('No orders with orderNumber: ' + req.params.customerId)
    else
        res.send(items)
});

router.post('/', async (req, res) => {
    // loop over item's quantity to check if they are available in DB
    const orderLines = req.body.orderLines;
    const outOfStock = [];

    orderLines.forEach(element => {
        const stockQuantity = service.getQuantity(element.productId);

        if(orderLines.quantity > stockQuantity) {
            outOfStock.push(element.productId);
        }
    });

    if (outOfStock.length > 0) {
        const apiResponse = {
                success: false,
                message: 'Out of stock',
                data: outOfStock
            };
            res.send(apiResponse);
        }
        else {
            await service.addOrder(req.body);
            const apiResponse = {
                success: true,
            };
            res.status(201).send(apiResponse);
    }

});

router.get('/get-quantity/:productId', async (req, res) => {
    console.log('addOrder=>', req.params.productId);
    const data = await service.getQuantity(req.params.productId);
    console.log(data);

    res.status(201).send(data);
});

module.exports = router