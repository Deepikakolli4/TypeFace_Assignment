import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import '../App.css'
const Upload = () => {
  const [uploadResult, setUploadResult] = useState(null);

  return (
    <div className="page-container">
      <h2 className="page-title">Upload Receipt or PDF</h2>
      <FileUpload onUploadSuccess={setUploadResult} />
      {uploadResult && (
        <div className="upload-result">
          <h3 className="form-title">Extracted Transactions</h3>
          {uploadResult.createdTransactions.length > 0 ? (
            <ul className="transaction-list">
              {uploadResult.createdTransactions.map((tx) => (
                <li key={tx._id} className="transaction-item">
                  <span className="transaction-title">{tx.title}</span>: ${tx.amount} ({tx.type})
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No transactions extracted.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;