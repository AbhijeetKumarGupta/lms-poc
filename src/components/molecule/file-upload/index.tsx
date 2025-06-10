'use client';

import { useState } from 'react';
import { IKUpload } from 'imagekitio-next';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FieldError } from 'react-hook-form';

import { FILE_TYPES } from '@/constants';

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: FILE_TYPES;
  formError?: FieldError;
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = FILE_TYPES.IMAGE,
  formError,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file: File) => {
    if (fileType === FILE_TYPES.VIDEO) {
      if (!file.type.startsWith('video/')) {
        setError('Please upload a valid video file');
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError('Video size must be less than 100MB');
        return false;
      }
    } else {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, or WebP)');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return false;
      }
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: formError ? 'error.main' : 'primary.light',
        color: formError ? 'error.main' : 'primary.light',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <IKUpload
        fileName={fileType === FILE_TYPES.VIDEO ? FILE_TYPES.VIDEO : FILE_TYPES.IMAGE}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        accept={fileType === FILE_TYPES.VIDEO ? 'video/*' : 'image/*'}
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === FILE_TYPES.VIDEO ? '/videos' : '/images'}
        style={{
          width: '100%',
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
        }}
      />

      {uploading && (
        <Box display="flex" alignItems="center" gap={1}>
          <CircularProgress size={16} color="primary" />
          <Typography variant="body2" color="text.primary">
            Uploading...
          </Typography>
        </Box>
      )}

      {error && (
        <Typography
          variant="caption"
          sx={{
            ml: '14px !important',
            mt: '3px !important',
            color: theme => theme.palette.error.main,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
