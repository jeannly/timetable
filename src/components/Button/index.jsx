import React from 'react';

import './styles.scss';

class Button extends React.Component {
  render() {
    return (
      <button>
        {this.props.text}
      </button>
    );
  }
}

Button.defaultProps = {
  text: "Button"
}

export default Button;