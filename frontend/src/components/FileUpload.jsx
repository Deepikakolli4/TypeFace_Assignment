import React, { useState, useEffect } from 'react';
import { uploadReceipt } from '../api/api';
import '../App.css';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setError('Only image files are allowed');
      setFile(null);
      setPreviewUrl('');
      return;
    }

    setFile(selectedFile);
    setError('');

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const response = await uploadReceipt(file);
      onUploadSuccess(response.data);
      setFile(null);
      setPreviewUrl('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Cleanup the object URL when the component unmounts or when a new file is selected
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="upload-container">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file" className="form-label">Select Image</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        {previewUrl && (
          <div className="preview-container">
            <p>Image Preview:</p>
            <img src={previewUrl} alt="Preview" className="image-preview" />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !file}
          className={uploading || !file ? 'form-button-disabled' : 'form-button'}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
