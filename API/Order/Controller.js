const nodemailer = require("nodemailer");
var Mailgen = require("mailgen");
const Orders = require("./model");
const { connect } = require("mongoose");

const placeOrder = async (req, res) => {
  const {
    customerName,
    customerEmail,
    customerId,
    customerContact,
    customerAddress,
    totalBill,
    order,
  } = req.body;

  const config = {
    service: "gmail",
    auth: {
      user: "shahlaiba152@gmail.com",
      pass: "bykvicymdxvwfzwf",
    },
  };

  const transporter = nodemailer.createTransport(config);

  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  try {
    await connect(process.env.MONGO_URI);
    const orders = await Orders.create({
      customerName,
      customerEmail,
      customerId,
      customerContact,
      customerAddress,
      order,
      totalBill,
    });
  
    await transporter.sendMail({
      from: "shahlaiba152@gmail.com",
      to: customerEmail,
      subject: "Order Placed",
      html: mailGenerator.generate({
        body: {
          name: customerName,
          intro: "Welcome to Beautify! We're very excited to have you onboard.",
          table: {
            data: [
              {
                customerName,
                customerEmail,
                customerAddress,
                customerContact,
                tracking_id: orders._id,
              },
            ],
          },
          outro: `Your Order will be delivered at ${customerAddress}, please ensure that your contact number ${customerContact} is active.`,
        },
      }),
    });
  
    res.json({
      success: true,
      message: "Order Placed Successfully. Please Check your MailBox",
      orderId: orders._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

const allOrders = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const orders = await Orders.find();
    res.json({ orders });
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
};

const trackOrder = async (req, res) => {
  const { _id } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    const order = await Orders.findOne({ _id });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { placeOrder, allOrders, trackOrder, getOrderById };
