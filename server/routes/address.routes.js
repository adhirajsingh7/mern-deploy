const router = require("express").Router();
const { address_controller } = require("../controllers");
const { is_authenticated } = require("../middlewares/auth");

router
  .route("/")
  .get(is_authenticated, address_controller.get_addresses)
  .post(is_authenticated, address_controller.create_address);

// router.route("/:user_id")

router
  .route("/:address_id")
  .get(address_controller.get_address_by_id)
  .put(address_controller.update_address)
  .delete(address_controller.delete_address);

module.exports = router;
