const express = require('express')
const router = express.Router();
const celebriteController = require('../controllers/celebriteController')

// mettre les routes de notre table celebrite:
router.get('/getAll', celebriteController.getAllCelebrites)
router.post('/add', celebriteController.addCelebrite)

module.exports = router