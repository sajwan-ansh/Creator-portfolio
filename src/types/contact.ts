export interface ContactInquiryPayload {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  honeypot?: string; // Anti-spam bot trap
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

export interface IContactService {
  submitInquiry(payload: ContactInquiryPayload): Promise<ContactSubmissionResult>;
}
