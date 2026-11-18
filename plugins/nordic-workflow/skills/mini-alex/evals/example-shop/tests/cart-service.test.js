// Tests for cart summary calculation

const { getCartSummary } = require("../src/cart/cart-service");

describe("getCartSummary", () => {
  const baseCart = {
    items: [
      { name: "Widget", price: 25.00, quantity: 2 },
      { name: "Gadget", price: 15.00, quantity: 1 },
    ],
    shippingAddress: { state: "CA" },
  };

  test("calculates subtotal correctly without coupon", () => {
    const summary = getCartSummary(baseCart);
    expect(summary.subtotal).toBe(65.00);
    expect(summary.discount).toBe(0);
  });

  test("applies percentage coupon to subtotal", () => {
    const cart = {
      ...baseCart,
      coupon: { active: true, type: "percentage", percentOff: 10 },
    };
    const summary = getCartSummary(cart);
    expect(summary.subtotal).toBe(65.00);
    expect(summary.discount).toBe(6.50); // 10% of 65
    expect(summary.total).toBe(65.00 - 6.50 + summary.tax);
  });

  test("applies fixed coupon capped at subtotal", () => {
    const cart = {
      ...baseCart,
      coupon: { active: true, type: "fixed", amountOff: 100 },
    };
    const summary = getCartSummary(cart);
    expect(summary.discount).toBe(65.00); // capped at subtotal
  });
});
