const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const router = express.Router();

router.get(
  '/products',
  productsControllers.getAll,
);

router.get(
  '/products/:id',
  productsControllers.getById,
);

module.exports = router;
