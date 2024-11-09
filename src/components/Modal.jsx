// src/components/Modal.js
import React, { useState } from 'react';
import '../css/Modal.css';

function Modal({ onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const colors = ["#b38bfa", "#ff79f2", "#43e6fc", "#f19576", "#0047ff", "#6691ff"];

  const handleCreate = () => {
    if (groupName && selectedColor) {
      const initials = groupName.split(' ').map(word => word[0].toUpperCase()).join(''); 
      onCreateGroup({ name: groupName, color: selectedColor, initials });
      onClose();
    } else {
      alert('Please enter a group name and select a color');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Create New Group</h3>
        
        <div className="input-group">
          <label className="input-label">Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="group-name-input"
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Choose color</label>
          <div className="color-options">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        
        <button className="create-button" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Modal;
