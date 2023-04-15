import Product from '../models/Product';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ statusCode: 404, message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export async function createProduct(req, res) {
    try {
      console.log('createProduct function called');
      const { name, description, price } = req.body;
      const product = new Product({ name, description, price });
      await product.save();
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
  
export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ statusCode: 404, message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ statusCode: 404, message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
