import React from 'react';

import '../css/styles.scss';

const Day = (props) => {
  return (
    <div className="Column" id={props.name}>
      <div className="Header">{props.name}</div>
    </div>
  );
}

export default Day;