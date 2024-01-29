const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

//! Yeni bir ürün oluştur. (CREATE PRODUCT) start
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Yeni bir ürün oluştur. (CREATE PRODUCT) end

//! Tüm ürünleri getir. (GET ALL PRODUCTS) start
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Tüm ürünleri getir. (GET ALL PRODUCTS) end

//! Tek bir ürünü getir. (GET SINGLE PRODUCT) start
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    try {
      const product = await Product.findById(productId);

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Product not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Tek bir ürünü getir. (GET SINGLE PRODUCT) end

//! Ürünü güncelle (UPDATE PRODUCT) start
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Ürünü güncelle (UPDATE PRODUCT) end

//! Ürünü sil (DELETE PRODUCT) start
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Ürünü sil (DELETE PRODUCT) end

//! Ürünleri isimlerine göre ara start
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
});
//! Ürünleri isimlerine göre ara end

module.exports = router;
