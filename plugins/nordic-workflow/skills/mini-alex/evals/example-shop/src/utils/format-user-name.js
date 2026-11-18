// Formats a user's name for their profile page and account settings.
// Used in: profile page, account settings, order history header.
// Business rule: this is the user's legal/account name as they entered it.

function formatUserName(firstName, lastName) {
  const first = (firstName || "").trim();
  const last = (lastName || "").trim();

  if (!first && !last) return "Anonymous";
  if (!last) return first;
  if (!first) return last;

  return `${first} ${last}`;
}

module.exports = { formatUserName };
