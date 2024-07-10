const express = require('express');
const router = express.Router();
const service = require('../services/product.service');

router.get('/', async (req, res) => {
    let apiResponse = {
        success: false,
    }

    try {
        const products = await service.getAllProducts();
        apiResponse.success = true;
        apiResponse.data = products;
        res.statusCode(200).send(apiResponse);
    } catch (error) {
        console.log('error in product GET', error.code);
        apiResponse.error = error.code;
        apiResponse.message = 'An error occured while getting products';
        res.status(500).send(apiResponse);
    }
});

module.exports = router;