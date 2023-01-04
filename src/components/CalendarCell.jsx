import React from 'react';

import '../css/styles.scss';

const CalendarCell = (props) => {

  return (
    <div className="background-cell">
      { props.children }
    </div>
  );
}

export default CalendarCell;