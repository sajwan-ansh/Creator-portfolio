# Ansh. — Creator & Freelancer Portfolio Website

A high-end, editorial creator portfolio web application built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Designed specifically for animators, illustrators, video editors, photographers, and visual artists.

---

## 🚀 Features

- **Editorial Visual Aesthetic**: Warm cream background (`#f7f6f2`), Playfair Display serif headlines, handwritten cursive accents (*Same Sky Bigger Dreams*), and dark contrast footer CTA.
- **Dynamic Category Showcase**: Filter work items across **2D Animation**, **3D Animation**, **3D Model**, **Video Editing**, **Photography**, and **Artworks**.
- **Dedicated Category Gallery Page View**: Deep-dive full gallery page for each category with search, breadcrumb navigation, and direct section uploads.
- **Media Lightbox Viewer**:
  - Video modal with native controls, metadata preload (`preload="metadata"`), runtime specs, and keyboard arrow key navigation.
  - Photo lightbox with zoom, camera/software metadata, and direct download option.
- **Decoupled Architecture & Security**:
  - `AuthService` & `AuthContext` for creator authentication.
  - `StorageService` for media validation (MIME check, 10MB image limit, 50MB video limit) and Blob ObjectURL creation (eliminates Base64 `localStorage` memory bloat).
  - `ContactService` with anti-spam honeypot, real validation, and Formspree / Resend API integration.
- **Centralized Site Configuration**: Manage all creator details (name, bio, social links, stats, quotes) in `src/config/siteConfig.ts`.
- **Accessibility & SEO**: Semantic HTML5, focus trapping (`useFocusTrap`), `Escape` key close listeners, Open Graph, Twitter Cards, and JSON-LD `Person` schema.

---

## 🛠️ Project Structure

```text
src/
  components/
    common/         (ImageWithFallback)
    AboutSection.tsx
    AdminAuthModal.tsx
    CategoryGalleryPage.tsx
    ContactModal.tsx
    ContactSection.tsx
    Hero.tsx
    MediaModal.tsx
    Navbar.tsx
    UploadModal.tsx
    WorkGrid.tsx
  config/
    envConfig.ts    (Environment variables setup)
    siteConfig.ts   (Centralized creator configuration)
  context/
    AuthContext.tsx (Creator session & authentication state)
  data/
    initialPortfolioData.ts
  hooks/
    useAuth.ts
    useFocusTrap.ts
    useMediaQuery.ts
  services/
    authService.ts  (Authentication abstraction)
    contactService.ts (Inquiry delivery & validation)
    storageService.ts (File validation & media storage adapter)
  types/
    auth.ts
    contact.ts
    portfolio.ts
    storage.ts
```

---

## 💻 Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Check TypeScript Types
```bash
npx tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
npx vercel
```

### Netlify (Drag & Drop)
Drag and drop the `dist/` folder after running `npm run build` to [app.netlify.com/drop](https://app.netlify.com/drop).
