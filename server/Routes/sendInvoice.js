const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.post("/send-invoice", async (req, res) => {
  try {
    const { email, order, totalPrice } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!order || !order.length) return res.status(400).json({ error: "Order data is missing" });

    // Format the order into a readable invoice date
    const orderText = order.map((item) => {
      return `Name: ${item.name}, Quantity: ${item.quantity}, Size: ${item.size}, Price: ₹${item.price}`;
    }).join("\n");

    const emailContent = `
      Thank you for your order from Artventure!
      
      Here is your invoice:
      ----------------------
      ${orderText}

      Total Price: ₹${totalPrice}/-
      
      We appreciate your business!
    `;

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "Artventure",
      to: email,
      subject: "Your Invoice from Artventure",
      text: emailContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Invoice Email Sent:", info.response);

    res.json({ success: true, message: `Invoice sent to ${email}` });
  } catch (error) {
    console.error("Error getting when sending invoice:", error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

module.exports = router;
