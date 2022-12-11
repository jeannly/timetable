import React from 'react';

import '../css/styles.scss';

const Sidebar = (props) => {
  return (
    <div className="Sidebar">
      {props.children}
    </div>
  );
}

export default Sidebar;