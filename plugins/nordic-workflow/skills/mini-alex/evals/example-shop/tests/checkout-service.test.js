// Tests for checkout flow

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
