const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');

router.post('/result-update', authenticationMiddleware, mondayController.updateResult);

module.exports = router;
