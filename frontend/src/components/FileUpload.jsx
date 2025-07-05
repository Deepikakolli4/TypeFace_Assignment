import React, { useState } from 'react';
import { uploadReceipt, uploadPdf } from '../api/api';
import '../app.css';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    try {
      const uploadFn = file.type === 'application/pdf' ? uploadPdf : uploadReceipt;
      const response = await uploadFn(file);
      onUploadSuccess(response.data);
      setFile(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3 className="form-title">Upload Receipt or PDF</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file" className="form-label">Select File</label>
          <input
            type="file"
            id="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
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