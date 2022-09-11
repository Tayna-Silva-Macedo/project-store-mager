const express = require('express');
const { productsController } = require('../controllers');
const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateProductsFields, productsController.insert);
router.put('/:id', validateProductsFields, productsController.update);
router.delete('/:id', productsController.destroy);

module.exports = router;
