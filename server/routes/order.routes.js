const router = require("express").Router();
const { order_controller } = require("../controllers");
const { is_authenticated } = require("../middlewares/auth");

router
  .route("/")
  .get(is_authenticated, order_controller.get_orders)
  .post(is_authenticated, order_controller.create_order);

router
  .route("/:order_id")
  .get(order_controller.get_order_by_id)
  .put(is_authenticated, order_controller.update_order)
  .delete(is_authenticated, order_controller.delete_order);

module.exports = router;
