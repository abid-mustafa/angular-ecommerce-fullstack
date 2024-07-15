const express = require('express');
const router = express.Router();
const service = require('../services/category.service');

router.get('/', async (req, res, next) => {
    try {
        let apiResponse = {
            success: false,
        }
        const categories = await service.getAllCategories();
        apiResponse.success = true;
        apiResponse.data = categories;
        res.status(200).send(apiResponse);
    } catch (error) {
        res.status(500).send('An error occured while getting categories');
    }
});

router.post('/', async (req, res) => {
    let apiResponse = {
        success: false,
    }
    try {
        const data = await service.addCategory(req.body);

        if(data.affectedRows === 1) {
            apiResponse.success = true;
            res.status(200).send(apiResponse);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured while adding category.');
    }
});

module.exports = router;