const express = require('express');
const salesControllers = require('../controllers/salesControllers');

const router = express.Router();

router.get(
  '/sales',
  salesControllers.getAll,
);

router.get(
  '/sales/:id',
  salesControllers.getById,
);

module.exports = router;
