// Handles the checkout flow and order creation

const { calculateDiscount } = require("../discounts/discount-service");
const { calculateTax } = require("./tax-service");
const { createOrder } = require("../orders/order-service");

async function processCheckout(cart, paymentDetails, db) {
  // Recalculate everything server-side for security
  const lineItems = cart.items;
  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = calculateTax(subtotal, cart.shippingAddress);

  // Apply discount if coupon present
  let discount = 0;
  if (cart.couponCode) {
    const coupon = await db.coupons.findByCode(cart.couponCode);
    const total = subtotal + tax;
    discount = calculateDiscount(coupon, total);
  }

  const finalTotal = subtotal + tax - discount;

  const order = await createOrder({
    items: lineItems,
    subtotal,
    tax,
    discount,
    total: finalTotal,
    shippingAddress: cart.shippingAddress,
    payment: paymentDetails,
  });

  return { order, summary: { subtotal, tax, discount, total: finalTotal } };
}

function getConfirmationSummary(order) {
  return {
    subtotal: order.subtotal,
    discount: order.discount,
    tax: order.tax,
    total: order.total,
  };
}

module.exports = { processCheckout, getConfirmationSummary };
