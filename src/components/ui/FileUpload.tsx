'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn, formatFileSize } from '@/lib/utils';

export interface FileUploadProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  onFileChange: (files: File[]) => void;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  value?: File | null;
  showPreview?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  },
  maxSize = 25 * 1024 * 1024, // 25MB
  maxFiles = 1,
  onFileChange,
  label = 'Upload file',
  helperText = 'Drag and drop your file here, or click to browse',
  error,
  className,
  value,
  showPreview = true,
}) => {
  const [files, setFiles] = useState<File[]>(value ? [value] : []);
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles);
      setFiles(newFiles);
      onFileChange(newFiles);
    },
    [maxFiles, onFileChange]
  );
  
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
  });
  
  const fileRejectionItems = fileRejections.map(({ file, errors }: { file: File; errors: Array<{ message: string }> }) => (
    <li key={file.name} className="text-sm text-red-500">
      {file.name} - {errors[0].message}
    </li>
  ));
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFileChange(newFiles);
  };
  
  // Helper function to determine border and background styles
  const getBorderStyles = (isDragActive: boolean, error?: string) => {
    if (isDragActive) return 'border-blue-400 bg-blue-50';
    if (error) return 'border-red-300 bg-red-50';
    return 'border-gray-300 bg-gray-50 hover:bg-gray-100';
  };
  
  // Helper function to determine text color styles
  const getTextColorStyle = (isDragActive: boolean, error?: string) => {
    if (isDragActive) return 'text-blue-500';
    if (error) return 'text-red-500';
    return 'text-gray-400';
  };
  
  return (
    <div className={cn('mb-4', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer',
          getBorderStyles(isDragActive, error),
        )}
      >
        <input {...getInputProps()} />
        
        <svg
          className={cn(
            'w-10 h-10 mb-2',
            getTextColorStyle(isDragActive, error)
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="mb-2 text-sm text-gray-500">
          {isDragActive ? 'Drop the file here' : helperText}
        </p>
        
        <p className="text-xs text-gray-500">
          PDF, PPTX (max. {formatFileSize(maxSize)})
        </p>
      </div>
      
      {fileRejectionItems.length > 0 && (
        <ul className="mt-2">{fileRejectionItems}</ul>
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {showPreview && files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Selected file:</h4>
          <ul className="mt-2 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}_${file.lastModified}`}
                className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 