const router = require("express").Router();
const { cart_controller } = require("../controllers");
const { is_authenticated } = require("../middlewares/auth");

router
  .route("/")
  .get(is_authenticated, cart_controller.get_all_carts)
  .post(is_authenticated, cart_controller.add_product);

router
  .route("/:cart_id")
  .put(cart_controller.edit_cart)
  .delete(cart_controller.empty_cart);

module.exports = router;
