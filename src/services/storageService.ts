import { IStorageService, StorageUploadOptions, StorageUploadResult } from '../types/storage';
import { ENV } from '../config/envConfig';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'];

class StorageService implements IStorageService {
  validateFile(file: File, options: StorageUploadOptions): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file selected.' };
    }

    const { mediaType } = options;

    if (mediaType === 'photo') {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
        return {
          valid: false,
          error: `Invalid image format (${file.type}). Supported formats: JPG, PNG, WEBP, GIF.`,
        };
      }
      if (file.size > (options.maxSizeBytes || MAX_IMAGE_SIZE)) {
        return {
          valid: false,
          error: `Image file size exceeds limit (10MB maximum). Selected file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
        };
      }
    } else if (mediaType === 'video') {
      if (!ALLOWED_VIDEO_TYPES.includes(file.type.toLowerCase())) {
        return {
          valid: false,
          error: `Invalid video format (${file.type}). Supported formats: MP4, WEBM, MOV.`,
        };
      }
      if (file.size > (options.maxSizeBytes || MAX_VIDEO_SIZE)) {
        return {
          valid: false,
          error: `Video file size exceeds limit (50MB maximum). Selected file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
        };
      }
    }

    return { valid: true };
  }

  async uploadFile(file: File, options: StorageUploadOptions): Promise<StorageUploadResult> {
    const validation = this.validateFile(file, options);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Production Cloud Provider Switch (Supabase Storage / Cloudinary)
    if (ENV.storageProvider === 'cloudinary' && ENV.cloudinaryCloudName && ENV.cloudinaryUploadPreset) {
      return this.uploadToCloudinary(file, options);
    }

    // Development / Local ObjectURL Upload Handler
    // Avoids Base64 localStorage memory crashes by generating efficient object Blob URLs
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const objectUrl = URL.createObjectURL(file);
          const thumbnailUrl = options.mediaType === 'photo' 
            ? objectUrl 
            : 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80';

          resolve({
            success: true,
            mediaUrl: objectUrl,
            thumbnailUrl,
            fileName: file.name,
            fileSizeBytes: file.size,
            mimeType: file.type,
          });
        } catch (err) {
          resolve({
            success: false,
            error: 'Failed to process media file. Please try again.',
          });
        }
      }, 500);
    });
  }

  private async uploadToCloudinary(file: File, options: StorageUploadOptions): Promise<StorageUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', ENV.cloudinaryUploadPreset);
      formData.append('resource_type', options.mediaType === 'video' ? 'video' : 'image');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${ENV.cloudinaryCloudName}/${options.mediaType === 'video' ? 'video' : 'image'}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload error (${response.status})`);
      }

      const data = await response.json();

      return {
        success: true,
        mediaUrl: data.secure_url,
        thumbnailUrl: options.mediaType === 'video' ? data.secure_url.replace(/\.[^/.]+$/, '.jpg') : data.secure_url,
        fileName: file.name,
        fileSizeBytes: file.size,
        mimeType: file.type,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Production cloud storage upload failed.',
      };
    }
  }
}

export const storageService: IStorageService = new StorageService();
