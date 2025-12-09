// controllers/order.controller.js
import { Order } from "../models/order.model.js";






// GET /api/orders?status=shipped
export const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate("userId", "email username")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("GetAllOrders error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // pending | paid | shipped | delivered | cancelled

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    console.log("UpdateOrderStatus error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};



export const createOrder = async (req, res) => {
  try {
    const { items, subtotal, tax, total } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: "Order must include items" });
    }

    const order = await Order.create({
      userId: req.user?._id || null,
      items,
      subtotal,
      tax,
      total,
    });

    // ⭐ 新建完后用 populate 拿一份完整的
    const fullOrder = await Order.findById(order._id)
      .populate("items.productId");

    // ⭐ 统一返回字段名: order
    res.status(201).json({ success: true, order: fullOrder });

  } catch (error) {
    console.log("Order Create Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const getCurrentOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.productId");          // ⭐ 同样 populate

    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.log("Get order error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("items.productId");         // ⭐ 关键：这里没 populate 所以拿不到 name

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, order });

  } catch (error) {
    console.log("Get order by ID error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
