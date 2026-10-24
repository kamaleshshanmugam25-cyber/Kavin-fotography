/**
 * KANVI FOTOGRAPHY - Studio Configuration & Client Details
 * Centralized information for easy maintenance and developer customization.
 */

export const STUDIO_INFO = {
  brandName: 'KANVI FOTOGRAPHY',
  shortName: 'Kanvi',
  establishedYear: '2019',
  founder: 'Bala',
  tagline: 'Share & Save Your Moment With Us',
  heroHeadline: 'Every Moment Has a Story.\nWe Capture It Forever.',
  heroSubheadline:
    "From once-in-a-lifetime weddings to life's smallest celebrations, we turn your most meaningful moments into timeless memories.",
  
  // Location & Service Area
  location: {
    address: 'Woraiyur, Tiruchirappalli',
    state: 'Tamil Nadu',
    country: 'India',
    fullAddress: 'Woraiyur, Tiruchirappalli, Tamil Nadu, India',
    serviceArea: 'All over India',
    googleMapsUrl: 'https://maps.google.com/?q=Woraiyur,+Tiruchirappalli,+Tamil+Nadu,+India',
  },

  // Contact Information
  contact: {
    phone: '7397064481',
    phoneDisplay: '+91 73970 64481',
    whatsapp: '7397064481',
    whatsappDisplay: '+91 73970 64481',
    email: 'Kanvimedia.info@gmail.com',
  },

  // Social Channels (Easily updated when handles become available)
  social: {
    instagram: {
      url: 'https://instagram.com/kanvi_fotography',
      handle: '@kanvi_fotography',
      label: 'Instagram',
      isPlaceholder: true, // Note: update when client confirms exact handle
    },
    whatsapp: {
      url: 'https://wa.me/917397064481',
      label: 'WhatsApp',
    },
    youtube: {
      url: 'https://youtube.com',
      handle: 'Kanvi Fotography Films',
      label: 'YouTube Films',
      isPlaceholder: true,
    },
  },

  // Brand Assets
  assets: {
    logoOriginal: '/assets/logo.png',
    logoLight: '/assets/logo-light.png',
    logoCropped: '/assets/logo-original-cropped.png',
    logoMark: '/assets/logo-mark.png',
  },
};

/**
 * Generate a properly URL-encoded WhatsApp link for booking enquiries.
 */
export function generateWhatsAppBookingUrl({
  fullName,
  phone,
  email,
  eventType,
  eventDate,
  eventLocation,
  additionalDetails,
}) {
  const cleanPhone = STUDIO_INFO.contact.whatsapp.replace(/\D/g, '');
  const targetNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const message = `*NEW BOOKING ENQUIRY - KANVI FOTOGRAPHY*
----------------------------------------
*Name:* ${fullName || 'Not provided'}
*Phone:* ${phone || 'Not provided'}
*Email:* ${email || 'Not provided'}
*Event Type:* ${eventType || 'Not specified'}
*Event Date:* ${eventDate || 'Not specified'}
*Event Location:* ${eventLocation || 'Not specified'}

*Additional Requirements / Details:*
${additionalDetails ? additionalDetails : 'No additional details specified.'}
----------------------------------------
_Sent via Kanvi Fotography Website Enquiry_`;

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}
