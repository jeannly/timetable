import React from 'react';

import '../css/styles.scss';

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