const express = require('express')
const router = express.Router();
const clientController = require('../controllers/clientController')

// mettre les routes de notre table celebrite:
router.get('/getAll', clientController.getAllClients)


module.exports = router