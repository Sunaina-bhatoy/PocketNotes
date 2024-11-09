import React, { useState, useEffect } from 'react';
import centerImage from '../assets/main_image.png';
import '../css/GroupContent.css';

const MainContent = ({ selectedGroup, toggleSidebar, isSidebarVisible, isMobile }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages'));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const formatDateAndTime = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${formattedDate} • ${formattedTime}`;
  };

  const handleMessageSubmit = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newMessage = {
      text: inputValue,
      time: formatDateAndTime(),
    };

    setMessages((prevMessages) => {
      const groupMessages = prevMessages[selectedGroup?.name] || [];
      return {
        ...prevMessages,
        [selectedGroup?.name]: [...groupMessages, newMessage],
      };
    });

    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSubmit();
    }
  };

  return (
    <div className={selectedGroup ? 'content-group-open show' : 'content'}>
      {selectedGroup ? (
        <div className="group-content">
          <div className="group-name-container">
            <button className="back-button" onClick={() => toggleSidebar(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </button>
            <div 
              className="group-name-circle"
              style={{ backgroundColor: selectedGroup.color }}
            >
              {selectedGroup.initials}
            </div>
            <span className="group-name-text">{selectedGroup.name}</span>
          </div>

          <div className="group-messages">
            {messages[selectedGroup?.name]?.slice().reverse().map((message, index) => (
              <div key={index} className="message-container">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))}
          </div>

          {(!isMobile || !isSidebarVisible) && (
            <div className="textarea-container">
              <textarea
                rows="6"
                placeholder="Enter Your Text here ........"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="text-area"
              />
              <span
                className="icon"
                style={{ color: inputValue ? 'blue' : 'gray' }}
                onClick={handleMessageSubmit}
              >
                &#x27A4;
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="center-content">
          <img src={centerImage} alt="Center Illustration" className="center-image" />
          <h1 className="heading">Pocket Notes</h1>
          <p className="heading_des">
            Send and receive messages without keeping your phone online.
          </p>
          <p className="heading_des">
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <div className="footer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
            </svg> end-to-end encrypted
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
