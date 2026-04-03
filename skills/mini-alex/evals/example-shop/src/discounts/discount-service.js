// Core discount calculation logic

function calculateDiscount(coupon, subtotal) {
  if (!coupon || !coupon.active) return 0;

  if (coupon.type === "percentage") {
    return subtotal * (coupon.percentOff / 100);
  }

  if (coupon.type === "fixed") {
    return Math.min(coupon.amountOff, subtotal);
  }

  return 0;
}

function applyCoupon(coupon, lineItems) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = calculateDiscount(coupon, subtotal);
  return { subtotal, discount, total: subtotal - discount };
}

module.exports = { calculateDiscount, applyCoupon };
