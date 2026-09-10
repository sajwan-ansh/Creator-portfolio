import { IStorageService, StorageUploadOptions, StorageUploadResult } from '../types/storage';
import { ENV } from '../config/envConfig';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'];

class StorageService implements IStorageService {
  validateFile(file: File, options: StorageUploadOptions) {
    if (!file) return { valid: false, error: 'No file selected.' };

    const { mediaType } = options;
    const allowed = mediaType === 'photo' ? ALLOWED_IMAGE_TYPES : ALLOWED_VIDEO_TYPES;
    const maxSize = options.maxSizeBytes ?? (mediaType === 'photo' ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE);

    if (!allowed.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: `Invalid ${mediaType} format (${file.type}). Please select a supported file.`,
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File exceeds the ${Math.round(maxSize / (1024 * 1024))}MB size limit.`,
      };
    }

    return { valid: true };
  }

  async uploadFile(file: File, options: StorageUploadOptions): Promise<StorageUploadResult> {
    const validation = this.validateFile(file, options);
    if (!validation.valid) return { success: false, error: validation.error };

    if (ENV.storageProvider === 'cloudinary' && ENV.cloudinaryCloudName && ENV.cloudinaryUploadPreset) {
      return this.uploadToCloudinary(file, options);
    }

    // Local ObjectURLs are previews only. They are intentionally not presented as durable storage.
    return {
      success: true,
      mediaUrl: URL.createObjectURL(file),
      thumbnailUrl: options.mediaType === 'photo' ? URL.createObjectURL(file) : undefined,
      fileName: file.name,
      fileSizeBytes: file.size,
      mimeType: file.type,
    };
  }

  private async uploadToCloudinary(file: File, options: StorageUploadOptions): Promise<StorageUploadResult> {
    try {
      const resourceType = options.mediaType === 'video' ? 'video' : 'image';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', ENV.cloudinaryUploadPreset!);
      formData.append('resource_type', resourceType);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${ENV.cloudinaryCloudName}/${resourceType}/upload`,
        { method: 'POST', body: formData },
      );

      if (!response.ok) throw new Error(`Cloud upload failed (${response.status})`);
      const data = await response.json();

      return {
        success: true,
        mediaUrl: data.secure_url,
        thumbnailUrl: resourceType === 'video'
          ? data.secure_url.replace(/\.[^/.]+$/, '.jpg')
          : data.secure_url,
        fileName: file.name,
        fileSizeBytes: file.size,
        mimeType: file.type,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Production cloud storage upload failed.',
      };
    }
  }
}

export const storageService: IStorageService = new StorageService();
