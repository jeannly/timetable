import React from 'react';

import '../css/styles.scss';

const Button = (props) => {
  return (
    <button disabled={props.disabled}>
      {props.text}
    </button>
  );
}

Button.defaultProps = {
  text: "Button",
  disabled: false
}

export default Button;