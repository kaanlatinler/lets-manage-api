const { ProductCategories } = require("../../../models");

// Get all product categories
exports.getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategories.findAll();
    if (!productCategories || productCategories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No product categories found" });
    }
    res.status(200).json({ success: true, data: productCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a product category by ID
exports.getProductCategoryById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product category ID is required" });
  }

  try {
    const productCategory = await ProductCategories.findByPk(id);
    if (!productCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }
    res.status(200).json({ success: true, data: productCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a product category
exports.createProductCategory = async (req, res) => {
  const { Name } = req.body;

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const newProductCategory = await ProductCategories.create({
      Name,
    });
    res.status(201).json({ success: true, data: newProductCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a product category
exports.updateProductCategory = async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product category ID is required" });
  }

  if (!Name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const productCategory = await ProductCategories.findByPk(id);
    if (!productCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }

    productCategory.Name = Name;
    await productCategory.save();

    res.status(200).json({ success: true, data: productCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a product category
exports.deleteProductCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product category ID is required" });
  }

  try {
    const productCategory = await ProductCategories.findByPk(id);
    if (!productCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found" });
    }

    await productCategory.destroy();
    res
      .status(200)
      .json({ success: true, message: "Product category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
