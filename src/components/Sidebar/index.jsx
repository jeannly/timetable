import React from 'react';

import './styles.scss';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="Sidebar">
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar;