const router = require("express").Router();
const { review_controller } = require("../controllers");
const { is_authenticated } = require("../middlewares/auth");

router.route("/").get(review_controller.get_reviews);

router
  .route("/:product_id")
  .post(is_authenticated, review_controller.create_review);

router
  .route("/:review_id")
  .get(review_controller.get_review_by_id)
  .delete(review_controller.delete_review)
  .put(review_controller.update_review);

module.exports = router;
