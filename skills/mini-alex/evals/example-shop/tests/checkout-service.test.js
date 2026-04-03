// Tests for checkout flow
// NOTE: No test currently covers the discount calculation during checkout.
// The cart tests cover applyCoupon, but processCheckout calculates
// the discount separately.

const { getConfirmationSummary } = require("../src/checkout/checkout-service");

describe("getConfirmationSummary", () => {
  test("returns order summary fields", () => {
    const order = {
      subtotal: 65.00,
      tax: 4.71,
      discount: 6.50,
      total: 63.21,
    };
    const summary = getConfirmationSummary(order);
    expect(summary.subtotal).toBe(65.00);
    expect(summary.discount).toBe(6.50);
    expect(summary.total).toBe(63.21);
  });
});
