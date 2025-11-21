import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // 和 product.model.js 里的 model 名匹配
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export const Cart = mongoose.model('Cart', cartSchema);
