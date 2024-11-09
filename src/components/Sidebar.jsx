import React, { useState } from 'react';
import Modal from './Modal';
import '../css/Sidebar.css';

const Sidebar = ({ groups, addGroup, onSelectGroup, isSidebarVisible, toggleSidebar }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddGroupClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateGroup = (newGroup) => {
    const isDuplicate = groups.some(group => group.name === newGroup.name);
    if (isDuplicate) {
      alert("A group with this name already exists. Please choose a different name.");
      return;
    }

    addGroup(newGroup);
    setModalOpen(false);
  };

  return (
    <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
      <h2 className='Group_heading'>Pocket Notes</h2>
      <ul className="group-list">
        {groups.map((group, index) => (
          <li key={index} className="group-item" onClick={() => { onSelectGroup(group); toggleSidebar(false); }}>
            <div className="circle" style={{ backgroundColor: group.color }}>
              {group.initials}
            </div>
            <span className="group-name">{group.name}</span>
          </li>
        ))}
      </ul>
      <button className="add-group-button" onClick={handleAddGroupClick}>+</button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} onCreateGroup={handleCreateGroup} />
      )}
    </div>
  );
};

export default Sidebar;
