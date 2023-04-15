import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, },
  description: { type: String, },
  price: { type: Number,  },
  createdAt: { type: Date, default: Date.now },
});

const Product = model('Product', productSchema);

export default Product;