const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get(
  '/',
  salesControllers.getAll,
);

router.get(
  '/:id',
  salesControllers.getById,
);

router.post(
 '/',
 validateSale,
 salesControllers.create,
);

router.put(
  '/:id',
  validateSale,
  salesControllers.update,
);

module.exports = router;
