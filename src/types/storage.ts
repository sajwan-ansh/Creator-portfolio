export interface StorageUploadOptions {
  category?: string;
  mediaType: 'video' | 'photo';
  maxSizeBytes?: number;
}

export interface StorageUploadResult {
  success: boolean;
  mediaUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  error?: string;
}

export interface IStorageService {
  uploadFile(file: File, options: StorageUploadOptions): Promise<StorageUploadResult>;
  validateFile(file: File, options: StorageUploadOptions): { valid: boolean; error?: string };
}
