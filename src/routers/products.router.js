const express = require('express');
const { productsController } = require('../controllers');
const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateProductsFields, productsController.insert);

module.exports = router;
