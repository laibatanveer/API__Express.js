const app = require("express");
const router = app.Router();
const {
  placeOrder,
  allOrders,
  trackOrder,
  getOrderById,
} = require("./Controller");

router.post("/placeOrder", placeOrder);
router.get("/getAllOrders", allOrders);
router.get("/trackOrder/:_id", trackOrder);
router.get("/:orderId", getOrderById);

module.exports = router;
