import { IContactService, ContactInquiryPayload, ContactSubmissionResult } from '../types/contact';
import { ENV } from '../config/envConfig';

class ContactService implements IContactService {
  private validatePayload(payload: ContactInquiryPayload): { valid: boolean; error?: string } {
    if (!payload.name || payload.name.trim().length < 2) {
      return { valid: false, error: 'Please enter a valid name (at least 2 characters).' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!payload.email || !emailRegex.test(payload.email.trim())) {
      return { valid: false, error: 'Please enter a valid email address (e.g. alex@studio.com).' };
    }

    if (!payload.message || payload.message.trim().length < 10) {
      return { valid: false, error: 'Please provide a project description (at least 10 characters).' };
    }

    // Honeypot anti-spam check
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return { valid: false, error: 'Spam submission detected.' };
    }

    return { valid: true };
  }

  async submitInquiry(payload: ContactInquiryPayload): Promise<ContactSubmissionResult> {
    const validation = this.validatePayload(payload);
    if (!validation.valid) {
      return { success: false, message: validation.error || 'Invalid form input.' };
    }

    // Production Endpoint Handler (Formspree or Custom API)
    if (ENV.contactEndpoint || ENV.formspreeId) {
      try {
        const endpoint = ENV.contactEndpoint || `https://formspree.io/f/${ENV.formspreeId}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: payload.name.trim(),
            email: payload.email.trim(),
            service: payload.service,
            budget: payload.budget,
            message: payload.message.trim(),
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned status ${response.status}`);
        }

        return {
          success: true,
          message: 'Inquiry successfully delivered! Ansh will respond to your email within 24 hours.',
        };
      } catch (err) {
        return {
          success: false,
          message: err instanceof Error ? err.message : 'Failed to send inquiry to server. Please try again.',
        };
      }
    }

    // Development / Local Fallback with Real Validation Feedback
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Inquiry submitted successfully! (Development Mode: Connect VITE_CONTACT_ENDPOINT for live email delivery)',
        });
      }, 800);
    });
  }
}

export const contactService: IContactService = new ContactService();
