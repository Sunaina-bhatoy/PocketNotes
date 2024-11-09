import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import GroupContent from './components/GroupContent';
import './css/App.css';

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }

    const storedSelectedGroup = localStorage.getItem('selectedGroup');
    if (storedSelectedGroup) {
      setSelectedGroup(JSON.parse(storedSelectedGroup));
    }
  }, []);

  const addGroup = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setIsSidebarVisible(false);  
    localStorage.setItem('selectedGroup', JSON.stringify(group));
  };

  const toggleSidebar = (visible) => {
    setIsSidebarVisible(visible);
  };

  return (
    <div className="app">
      <Sidebar
        groups={groups}
        addGroup={addGroup}
        onSelectGroup={handleSelectGroup}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile} 
      />
      <GroupContent
        selectedGroup={selectedGroup}
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
        isMobile={isMobile}
      />
    </div>
  );
}

export default App;
