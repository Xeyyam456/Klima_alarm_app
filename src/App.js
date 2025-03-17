import React, { useState, useEffect } from 'react';
import './App.css';
import { errorCodesData } from './data';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Mitsubishi Heavy Industry');
  const [selectedErrorCode, setSelectedErrorCode] = useState('');
  const [errorCodes, setErrorCodes] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const models = [
    'Mitsubishi Heavy Industry',
    'Mitsubishi Electric',
    'Daikin',
    'Samsung',
    'LG',
    'Toshiba',
    'Gree',
    'Carrier',
    'Panasonic',
    'Bosch',
    'Fujitsu',  // Yeni model
    'Haier',    // Yeni model
    'Midea'     // Yeni model
  ];

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  useEffect(() => {
    const filteredErrors = errorCodesData.filter(error => error.model === selectedModel);
    setErrorCodes(filteredErrors);
    
    if (filteredErrors.length > 0) {
      setSelectedErrorCode(filteredErrors[0].code);
      setErrorDetails(filteredErrors[0]);
    } else {
      setSelectedErrorCode('');
      setErrorDetails(null);
    }
  }, [selectedModel]);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    e.target.style.borderColor = '#374151';
  };

  const handleErrorCodeChange = (e) => {
    setSelectedErrorCode(e.target.value);
    const error = errorCodes.find(err => err.code === e.target.value);
    if (error) setErrorDetails(error);
    e.target.style.borderColor = '#374151';
  };

  return (
    <div className="wrapper">
      <div className="theme-switch">
        <button 
          className="theme-button"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
      <div className="App">
        <div className="content-container">
          <div className="title-container">
            <h1 className="title">Kondisioner Xəta Axtarış Sistemi</h1>
          </div>
          
          <div className="main-container">
            <div className="error-details">
              <div className="error-content">
                <div className="search-container">
                  <div className="search-group">
                    <label>Kondisioner Modeli</label>
                    <select 
                      value={selectedModel}
                      onChange={handleModelChange}
                      onClick={() => setIsModelOpen(!isModelOpen)}
                      onBlur={() => setIsModelOpen(false)}
                      className={isModelOpen ? 'rotate-icon' : ''}
                    >
                      {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>

                  <div className="search-group">
                    <label>Xəta Kodu</label>
                    <select
                      value={selectedErrorCode}
                      onChange={(e) => handleErrorCodeChange(e)}
                      onClick={() => setIsErrorOpen(!isErrorOpen)}
                      onBlur={() => setIsErrorOpen(false)}
                      className={isErrorOpen ? 'rotate-icon' : ''}
                      disabled={errorCodes.length === 0}
                    >
                      {errorCodes.length > 0 ? (
                        errorCodes.map((error, index) => (
                          <option key={index} value={error.code}>Xəta Kodu: {error.code}</option>
                        ))
                      ) : (
                        <option value="">Xəta kodu tapılmadı</option>
                      )}
                    </select>
                  </div>
                </div>

                {errorDetails && (
                  <div className="error-result">
                    <div className="error-header">
                      <h2>Xəta Təfərrüatları</h2>
                    </div>
                    <div className="error-info">
                      <div className="error-row">
                        <div className="error-label">Xəta Kodu:</div>
                        <div className="error-value">{errorDetails.code}</div>
                      </div>
                      <div className="error-row">
                        <div className="error-label">İzahat:</div>
                        <div className="error-value">{errorDetails.description}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
