import React from 'react';

import './styles.scss';

class SidebarCard extends React.Component {
  render() {
    return (
      <div className="SidebarCard">
        {this.props.children}
      </div>
    );
  }
}

export default SidebarCard;