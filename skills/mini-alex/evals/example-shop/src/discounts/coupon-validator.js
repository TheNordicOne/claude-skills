// Validates coupon codes against the database

async function validateCoupon(couponCode, db) {
  const coupon = await db.coupons.findByCode(couponCode);

  if (!coupon) return { valid: false, reason: "Coupon not found" };
  if (!coupon.active) return { valid: false, reason: "Coupon is no longer active" };
  if (coupon.expiresAt && coupon.expiresAt < Date.now()) {
    return { valid: false, reason: "Coupon has expired" };
  }
  if (coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, reason: "Coupon usage limit reached" };
  }

  return { valid: true, coupon };
}

module.exports = { validateCoupon };
