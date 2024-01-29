const express = require("express");
const router = express.Router();

//! Diğer route dosyalarını içe aktarıyoruz.
const categoryRoute = require("./categories");
const authRoute = require("./auth");
const productRoute = require("./products");
const couponRoute = require("./coupons");
const userRoute = require("./users");
const paymentRoute = require("./payment");

//! Her route'u ilgili yol altında kullanıyoruz.
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);

module.exports = router;
