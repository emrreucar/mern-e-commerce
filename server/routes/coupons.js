const express = require("express");
const router = express.Router();

const Coupon = require("../models/Coupon");

//! Yeni bir kupon oluştur (CREATE COUPON) start
router.post("/", async (req, res) => {
  try {
    const { code } = req.body;
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ error: "This coupon is already exists" });
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Yeni bir kupon oluştur (CREATE COUPON) end

//! Tüm kuponları getir. (GET ALL COUPONS) start
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Tüm kuponları getir. (GET ALL COUPONS) end

//! Tek bir kupon getir. (GET SINGLE COUPON) start
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Tek bir kupon getir. (GET SINGLE COUPON) end

//! Kupon koduna göre kuponları getir start
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }

    const { discountPercent } = coupon;
    res.status(200).json({ discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//! Kupon koduna göre kuponları getir end

//! Kupon Güncelle (UPDATE COUPON) start
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Coupon.findById(couponId);

    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});

//! Kupon Güncelle (UPDATE COUPON) end

//! Kupon sil (DELETE COUPON) start
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const deletedCoupon = await Coupon.findByIdAndRemove(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }

    res.status(200).json({ message: "Coupon deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//! Kupon sil (DELETE COUPON) end

module.exports = router;
