const {Router} = require('express')
const controller = require("./controller")

const router = Router()

router.get('/',controller.getBitke)
router.post('/', controller.addBitka)

router.get('/:id', controller.getBitkaById)
router.delete('/:id', controller.removeBitka)


module.exports = router;