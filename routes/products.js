const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  productsControllers.getAll,
);

router.get(
  '/:id',
  productsControllers.getById,
);

router.post(
  '/',
  middlewares.validateProduct,
  productsControllers.create,
);

router.put(
  '/:id',
  middlewares.validateProduct,
  productsControllers.update,
);

router.delete(
  '/:id',
  productsControllers.deleted,
);

module.exports = router;
