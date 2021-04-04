const { Router } = require('express');
const alphabetController = require('../controllers/alphabetController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/process', authController.middleware, alphabetController.process);

router.get('/fetch', authController.middleware, alphabetController.fetch);

module.exports = router;