const express = require('express');
const router = express.Router();
const service = require('../services/product.service');

router.get('/', async (req, res, next) => {
    try {
        let apiResponse = {
            success: false,
        }
        const products = await service.getAllProducts();
        apiResponse.success = true;
        apiResponse.data = products;
        res.status(200).send(apiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while getting products');
    }
});

router.post('/', async (req, res) => {
    let apiResponse = {
        success: false,
    }
    try {
        const success = await service.addProduct(req.body);

        if(success) {
            apiResponse.success = true;
            res.status(200).send(apiResponse);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while adding product.');
    }
});

module.exports = router;