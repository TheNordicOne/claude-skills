// Order lifecycle management

const { sendEmail } = require("../email/email-service");

async function createOrder(orderData) {
  // In a real app this would persist to a database
  const order = {
    id: generateOrderId(),
    status: "confirmed",
    createdAt: new Date(),
    ...orderData,
  };

  // TODO: wrap in try/catch — email failure shouldn't block order creation
  await sendEmail({
    to: order.payment.email,
    template: "order-confirmation",
    data: order,
  });

  return order;
}

async function shipOrder(orderId, trackingNumber, db) {
  const order = await db.orders.findById(orderId);
  if (!order) throw new Error("Order not found");
  if (order.status !== "confirmed") throw new Error("Order cannot be shipped");

  order.status = "shipped";
  order.trackingNumber = trackingNumber;
  order.shippedAt = new Date();
  await db.orders.save(order);

  return order;
}

async function getOrderHistory(userId, db) {
  return db.orders.findByUserId(userId);
}

function generateOrderId() {
  return "ORD-" + Date.now().toString(36).toUpperCase();
}

module.exports = { createOrder, shipOrder, getOrderHistory };
