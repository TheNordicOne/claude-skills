// Domain events for order lifecycle
// Currently unused — was spiked during a past refactor but never wired up.

const ORDER_EVENTS = {
  CONFIRMED: "order.confirmed",
  SHIPPED: "order.shipped",
  DELIVERED: "order.delivered",
  CANCELLED: "order.cancelled",
};

function createEvent(type, payload) {
  return {
    type,
    payload,
    timestamp: new Date(),
    id: `evt-${Date.now().toString(36)}`,
  };
}

module.exports = { ORDER_EVENTS, createEvent };
