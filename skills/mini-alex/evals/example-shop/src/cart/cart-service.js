// Handles cart state and pricing display.
// Tax is calculated on the post-discount amount.

const { applyCoupon } = require("../discounts/discount-service");
const { calculateTax } = require("../checkout/tax-service");

function getCartSummary(cart) {
  const lineItems = cart.items;

  if (cart.coupon) {
    const { subtotal, discount, total } = applyCoupon(cart.coupon, lineItems);
    const tax = calculateTax(total, cart.shippingAddress);
    return {
      subtotal,
      discount,
      tax,
      total: total + tax,
    };
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = calculateTax(subtotal, cart.shippingAddress);
  return { subtotal, discount: 0, tax, total: subtotal + tax };
}

module.exports = { getCartSummary };
