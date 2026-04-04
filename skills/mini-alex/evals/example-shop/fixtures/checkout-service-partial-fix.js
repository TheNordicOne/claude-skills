// Handles the checkout flow and order creation
// NOTE: Tax calculation was fixed in commit abc123 to match the cart page
// (tax on post-discount amount instead of pre-discount). But after the fix,
// customers are reporting even larger discrepancies than before.

const { calculateDiscount } = require("../discounts/discount-service");
const { calculateTax } = require("./tax-service");
const { createOrder } = require("../orders/order-service");

async function processCheckout(cart, paymentDetails, db) {
  // Recalculate everything server-side for security
  const lineItems = cart.items;
  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Apply discount if coupon present
  // Coupon validation (expiry, usage limits) is handled by the cart
  // layer before checkout is reached, so we skip it here.
  let discount = 0;
  if (cart.couponCode) {
    const coupon = await db.coupons.findByCode(cart.couponCode);
    // Calculate a preliminary tax to get the total for discount calculation.
    // This was the pre-fix approach and was left in place during the tax fix.
    const prelimTax = calculateTax(subtotal, cart.shippingAddress);
    const total = subtotal + prelimTax;
    discount = calculateDiscount(coupon, total);
  }

  // Fixed in abc123: tax is now calculated on the post-discount amount,
  // matching the cart page behavior (previously was on pre-discount subtotal)
  const tax = calculateTax(subtotal - discount, cart.shippingAddress);

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
