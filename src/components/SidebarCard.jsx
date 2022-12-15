import React from 'react';

import '../css/styles.scss';

const SidebarCard = (props) => {
  
  return (
    <div className="sidebar-card">
      {props.children}
    </div>
  );
}

export default SidebarCard;