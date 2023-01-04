import React from 'react';

import '../css/styles.scss';

const ClassBlock = ({ name, type, location, time }) => {
  return (
    <div style={{ backgroundColor: 'red', position: 'absolute'}}>
      <p>{ name }</p>
      <p> { type }</p>
    </div>
  );
}

export default ClassBlock;