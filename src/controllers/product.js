const ProductSchema = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const getProducts = await ProductSchema.find();
    res.status(200).json({
      success: true,
      data: getProducts,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, stock, date } = req.body;

    const newProduct = await ProductSchema.create({
      name,
      description,
      stock,
      date,
    });
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const getProductDetail = await ProductSchema.findById(id);
    res.status(200).json({
      success: true,
      data: getProductDetail,
      message: "Product detail fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock, date } = req.body;

    await ProductSchema.findByIdAndUpdate(
      id,
      { name, description, stock, date },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductSchema.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { search } = req.query;
    const name = new RegExp(search, "i");

    const products = await ProductSchema.find({
      $or: [{ name }],
    });

    res.status(200).json({
      success: true,
      data: products,
      message: "Search Results...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  getUpdate,
  deleteProduct,
  createProduct,
  searchProduct,
};
