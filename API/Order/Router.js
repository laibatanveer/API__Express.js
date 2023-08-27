const app = require('express')
const router = app.Router()
const { placeOrder, allOrders, trackOrder } = require('./controller')

router.post('/placeOrder', placeOrder)
router.get('/getAllOrders', allOrders)
router.get('/trackOrder/:_id', trackOrder)


module.exports = router