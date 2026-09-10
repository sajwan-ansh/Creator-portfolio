/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORAGE_PROVIDER?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET?: string;
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_DEV_ADMIN_PIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
