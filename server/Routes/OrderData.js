const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });
    console.log("Existing Order:", eId);

    const images = data.map((item) => item.img);

    if (!eId) {
      // If user has no previous orders, create a new one
      await Order.create({
        email: req.body.email,
        order_data: [data],
        images: images,
      });
    } else {
      // If user already has orders, update existing record
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });

  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

router.post("/myOrderData", async (req, res) => {
  console.log("Fetching orders for:", req.body.email);
  
  try {
    let myData = await Order.findOne({ email: req.body.email });
    console.log("Fetched Data:", myData);

    if (!myData) {
      return res.status(404).json({ message: "No orders found for this emails." });
    }

    res.json({ orderData: myData });

  } catch (error) {
    console.error("Error fetching the order data:", error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

module.exports = router;
