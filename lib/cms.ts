import siteData from "@/data/site.json"

export const site = siteData

// Helper functions for common uses
export function getPhoneLink() {
  return `tel:${site.contact.phone}`
}

export function getSMSLink() {
  return `sms:${site.contact.phone}?body=${encodeURIComponent(site.contact.smsTemplate)}`
}

export function getEmailLink(subject = "Excavation Services Inquiry") {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(site.contact.smsTemplate)}`
}
