// Email sending service — wraps the external email provider

const TEMPLATES = {
  "order-confirmation": {
    subject: "Order Confirmed: {{orderId}}",
    body: "Thank you for your order! Your order {{orderId}} has been confirmed.",
  },
  "password-reset": {
    subject: "Reset your password",
    body: "Click the link to reset your password: {{resetLink}}",
  },
};

async function sendEmail({ to, template, data }) {
  const tmpl = TEMPLATES[template];
  if (!tmpl) throw new Error(`Unknown email template: ${template}`);

  const subject = interpolate(tmpl.subject, data);
  const body = interpolate(tmpl.body, data);

  // In production this calls the email provider API
  console.log(`Sending email to ${to}: ${subject}`);
  return { success: true, messageId: `msg-${Date.now()}` };
}

function interpolate(text, data) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "");
}

module.exports = { sendEmail, TEMPLATES };
