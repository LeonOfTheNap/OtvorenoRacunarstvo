const {Router} = require('express')
const controller = require("./controller")

const router = Router()

router.get('/', controller.getBitke)

router.post('/jednabitka/', controller.addBitka)
router.get('/jednabitka/:id', controller.getBitkaById)
router.put('/jednabitka/:id', controller.putBitkaById)
router.delete('/jednabitka/:id', controller.removeBitka)

router.get('/getegypt', controller.getEgypt)
router.get('/victornotfrance', controller.getVictorNotFrance)
router.get('/visedana', controller.getViseDana)
router.get('/openapi', controller.openapi)

module.exports = router;