// Configuración de la empresa desde variables de entorno
export const company = {
  name: import.meta.env.VITE_COMPANY_NAME || 'cdo.solutions',
  legalName: import.meta.env.VITE_COMPANY_LEGAL_NAME || 'CDO Solutions S.L.',
  cif: import.meta.env.VITE_COMPANY_CIF || '',
  address: import.meta.env.VITE_COMPANY_ADDRESS || '',
  country: import.meta.env.VITE_COMPANY_COUNTRY || 'España',
  email: import.meta.env.VITE_COMPANY_EMAIL || '',
  phone: import.meta.env.VITE_COMPANY_PHONE || '',
  schedule: import.meta.env.VITE_COMPANY_SCHEDULE || '8:00 - 23:00h (L-V)',
  social: {
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || '',
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || '',
  },
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || 'https://cdo.solutions',
};
