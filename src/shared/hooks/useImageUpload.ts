import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/shared/api/client';
import { appToast } from '@/components/toast';

interface ImageFile {
  uri: string;
  type: string; // e.g., 'image/jpeg'
  name: string;
}

interface UploadPayload {
  file: ImageFile;
  uploadUrlEndpoint: string;
}

interface UploadUrlResponse {
  upload_url: string;
  image_key: string;
}

const uploadImage = async ({ file, uploadUrlEndpoint }: UploadPayload): Promise<string> => {
  // Step 1: Get pre-signed URL from our backend
  const { data: { upload_url, image_key } } = await httpClient.post<UploadUrlResponse>(uploadUrlEndpoint, {
    content_type: file.type,
  });

  // Step 2: Upload the actual image file to the pre-signed URL (e.g., S3)
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const uploadResponse = await fetch(upload_url, {
    method: 'PUT',
    body: blob,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload image to storage.');
  }

  return image_key;
};

export const useImageUpload = () => {
  return useMutation({
    mutationFn: uploadImage,
    onError: (error: Error) => {
      appToast.error('Image upload failed', {
        description: error.message || 'Please try again.',
      });
    },
  });
};
