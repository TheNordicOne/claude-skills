// Formats a user's display name for public-facing UI elements.
// Used in: product reviews, community comments, public profile.
// Business rule: this is how the user appears to OTHER users.
// Currently identical to formatUserName, but the product team has
// discussed adding nickname support and display name preferences
// for the community features launching in Q3.

function formatDisplayName(firstName, lastName) {
  const first = (firstName || "").trim();
  const last = (lastName || "").trim();

  if (!first && !last) return "Anonymous";
  if (!last) return first;
  if (!first) return last;

  return `${first} ${last}`;
}

module.exports = { formatDisplayName };
