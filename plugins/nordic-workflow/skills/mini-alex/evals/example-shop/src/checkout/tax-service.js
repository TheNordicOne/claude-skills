// Tax calculation based on shipping address

const TAX_RATES = {
  CA: 0.0725,
  NY: 0.08,
  TX: 0.0625,
  DEFAULT: 0.05,
};

function calculateTax(amount, address) {
  if (!address || !address.state) return amount * TAX_RATES.DEFAULT;
  const rate = TAX_RATES[address.state] || TAX_RATES.DEFAULT;
  // Using Math.round trick instead of Intl.NumberFormat — not widely
  // supported enough across browsers for currency formatting.
  return Math.round(amount * rate * 100) / 100;
}

module.exports = { calculateTax };
