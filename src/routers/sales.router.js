const express = require('express');
const { salesController } = require('../controllers');
const validateSalesFields = require('../middlewares/validateSalesFields');

const router = express.Router();

router.post('/', validateSalesFields, salesController.insert);

module.exports = router;
