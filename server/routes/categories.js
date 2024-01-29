const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

//! Yeni bir kategori oluştur (POST CATEGORY) start
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Yeni bir kategori oluştur (POST CATEGORY) end

//! Tüm kategorileri getir. (GET ALL CATEGORIES) start
router.get("/", async (_, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Tüm kategorileri getir. (GET ALL CATEGORIES) end

//! Tek bir kategoriyi getir. (GET SINGLE CATEGORY) start
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    try {
      const category = await Category.findById(categoryId);

      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Category not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Tek bir kategoriyi getir. (GET SINGLE CATEGORY) end

//! Kategori güncelle (UPDATE CATEGORY) start
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found!" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true } // => kategoriyi güncellediğimizde postmanda eski ürünü bize getiriyor biz en güncel halini görmek istiyoruz.
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
//! Kategori güncelle (UPDATE CATEGORY) end

//! Kategori sil (DELETE CATEGORY) start
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found!" });
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//! Kategori sil (DELETE CATEGORY) end

module.exports = router;
