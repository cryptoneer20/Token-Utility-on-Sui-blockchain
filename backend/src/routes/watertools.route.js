const router = require('express').Router();
const WatertoolsController = require('../controllers/watertools.controller')
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware')

router.post("/create-token", awaitHandlerFactory(WatertoolsController.createToken))

module.exports = router