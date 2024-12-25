const { Product } = require("../../../models");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  const { Name, Description, Price, Image, CategoryId, BusinessId } = req.body;

  if (!Name || !Description || !Price || !Image || !CategoryId || !BusinessId) {
    return res.status(400).json({
      success: false,
      message:
        "Name, Description, Price, Image, Business ID and CategoryId are required",
    });
  }

  try {
    const newProduct = await Product.create({
      Name,
      Description,
      Price,
      Image,
      CategoryId,
      BusinessId,
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Name, Description, Price, Image, CategoryId, BusinessId } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.update(
      { Name, Description, Price, Image, CategoryId, BusinessId },
      { where: { Id: id } }
    );
    res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.destroy({ where: { Id: id } });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
