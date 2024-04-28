const { Review } = require("../models/review");

exports.get_reviews = async (req, res, next) => {
  let { page = 0, limit = 10, product_id = "" } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;
  let criteria = {};
  if (product_id) criteria.product_id = product_id;

  try {
    const response = await Review.find(
      criteria,
      {},
      { skip: offset, limit }
    ).populate("user_id", "full_name");

    const all_reviews = await Review.find(criteria).select({
      rating: 1,
      _id: 0,
    });

    return res.status(200).send({
      total: all_reviews.length,
      total_page: Math.ceil(all_reviews.length / limit),
      current_page: page,
      data: response,
      all_reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_review_by_id = async (req, res, next) => {
  const { review_id } = req.params;

  try {
    const response = await Review.findOne({ _id: review_id });
    if (!response) throw new Error("Review not found.");
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_review = async (req, res, next) => {
  const user_id = req.user._id;
  const { product_id } = req.params;
  const review = req.body;

  try {
    const response = await Review.create({ user_id, product_id, ...review });
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_review = async (req, res, next) => {
  const { review_id } = req.params;
  const review = req.body;

  try {
    const response = await Review.findOneAndUpdate({ _id: review_id }, review);
    res.status(200).json({ message: "Review updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_review = async (req, res, next) => {
  const { review_id } = req.params;

  try {
    const response = await Review.findOneAndDelete({ _id: review_id });
    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
