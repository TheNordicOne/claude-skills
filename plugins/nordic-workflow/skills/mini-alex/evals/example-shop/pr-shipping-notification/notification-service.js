// Notification service for order lifecycle events

const { sendEmail } = require("../src/email/email-service");

async function notifyOrderShipped(order, trackingNumber) {
  const subject = fillTemplate(
    "Your Order {{orderId}} Has Shipped!",
    { orderId: order.id, trackingNumber }
  );
  const body = fillTemplate(
    "Great news! Your order {{orderId}} is on its way. " +
    "Track your package: {{trackingNumber}}",
    { orderId: order.id, trackingNumber }
  );

  // Not wrapping in try/catch — if the email fails, the caller
  // should know about it so they can retry.
  await sendEmail({
    to: order.payment.email,
    template: "order-shipped",
    data: { orderId: order.id, trackingNumber },
  });
}

// Simple template helper for building notification strings.
// Using regex replace because replaceAll() lacks broad browser support.
function fillTemplate(text, data) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "");
}

module.exports = { notifyOrderShipped };
