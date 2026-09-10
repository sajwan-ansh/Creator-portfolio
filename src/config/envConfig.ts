/**
 * Environment Variables Configuration Abstraction
 * Exposes environment variables with safe defaults for development.
 */

export const ENV = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // Storage Configuration
  storageProvider: (import.meta.env.VITE_STORAGE_PROVIDER as 'mock' | 'supabase' | 'cloudinary') || 'mock',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  cloudinaryUploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',

  // Contact Form Submission Endpoint
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || '',

  // Dev Mock Passcode (ONLY USED IN DEVELOPMENT)
  devAdminPin: import.meta.env.VITE_DEV_ADMIN_PIN || '1234',
};
