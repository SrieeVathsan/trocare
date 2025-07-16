// File: src/pages/FileUpload.jsx
import { useState, useRef } from 'react';
import axios from 'axios';
import './FileUpload.css';

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadResults, setUploadResults] = useState([]);
  const [processingStarted, setProcessingStarted] = useState(false);
  const [fileStatus, setFileStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const dropRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
    setUploadResults([]);
    setProcessingStarted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    setUploadResults([]);
    setProcessingStarted(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));
    try {
      setLoadingUpload(true);
      const response = await axios.post('/upload', formData);
      setUploadResults(response.data.records);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleInitiateProcess = async () => {
    try {
      await axios.post('/initiate-file-process');
      setProcessingStarted(true);
    } catch (error) {
      console.error('Initiate process error:', error);
    }
  };

  const handleViewStatus = async () => {
    try {
      setLoadingStatus(true);
      const response = await axios.get('/files-status');
      setFileStatus(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Status fetch error:', error);
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>File Upload</h2>

      <div
        ref={dropRef}
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drag & Drop Files Here or <span className="browse">Browse</span>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {selectedFiles.length > 0 && (
        <ul className="file-list">
          {Array.from(selectedFiles).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <button className="btn" onClick={handleUpload} disabled={selectedFiles.length === 0 || loadingUpload}>
        {loadingUpload ? 'Uploading...' : 'Upload Files'}
      </button>

      {uploadResults.length > 0 && (
        <div className="upload-results">
          <h3>Upload Results:</h3>
          <ul>
            {uploadResults.map((file, idx) => (
              <li key={idx}>
                <strong>{file.file_name}</strong>: {file.upload_status}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="btn"
        onClick={handleInitiateProcess}
        disabled={uploadResults.length === 0}
      >
        Initiate Process
      </button>

      {processingStarted && (
        <p className="confirmation-msg">
          ✅ Process is initiated. It may take a while. Please check your file status by clicking 'View File Status'.
        </p>
      )}

      <button className="btn" onClick={handleViewStatus}>
        {loadingStatus ? 'Fetching Status...' : 'View File Status'}
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h3>File Status:</h3>
            <ul>
              {fileStatus.map((file, idx) => (
                <li key={idx}>
                  <strong>{file.file_name}</strong>: {file.status} – {file.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;