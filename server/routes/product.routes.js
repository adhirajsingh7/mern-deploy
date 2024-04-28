const router = require("express").Router();
const { product_controller } = require("../controllers");

const nodemailer = require("nodemailer");
const { upload } = require("../middlewares/multer.middleware");
const { is_authenticated } = require("../middlewares/auth");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const mailOptions = {
  from: {
    name: "Ecommerce company",
    address: process.env.NODEMAILER_USER,
  },
  to: ["adhiraj.thakurr707@gmail.com"],
  subject: "Order confirmation",
  text: "ORDER IS CONFIRMED",
  html: "<b>ORDER IS CONFIRMED IN HTML PART</b>",
};

router
  .route("/")
  .get(product_controller.get_products)
  .post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    product_controller.create_product
  );

router
  .route("/:product_id")
  .get(product_controller.get_product_by_id)
  .put(
    upload.fields([{ name: "image", maxCount: 1 }]),
    product_controller.update_product
  )
  .delete(product_controller.delete_product);

// router.route("/mail").get(async(req, res)=>{
//   try {
//     const response = transporter.sendMail(mailOptions);
//     return res.status(200).json({"MAIL SEND SUCCESSFULLY ": response})
//   } catch (error) {
//     console.log(error)
//   }
// })

module.exports = router;
