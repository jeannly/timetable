import React from 'react';

import Day from './Day';
import '../css/styles.scss';

import { MilitaryTime } from '../utils/time';
import { get_earliest_and_latest_times } from '../utils/export-data_utils';

const MINUTES_PER_CELL = 30; // duration of a single grid cell in mins
const NUMBER_OF_GRID_COLUMNS = 5; // 1 for each day, mon - fri

const Calendar = (props) => {
  if (!props.data) { return; }

  let styles = {}; // 'namespace' for all inline styles

  let {earliest_start_time, latest_end_time} = get_earliest_and_latest_times(props.data);
  
  // number of grid rows = difference between the latest end time and earliest start time, as a unit of MINUTES PER CELL
  let number_of_grid_rows = Math.ceil((latest_end_time.toMinutes() - earliest_start_time.toMinutes()) / MINUTES_PER_CELL);
  styles.calendar = {
    gridTemplateRows: `repeat(${number_of_grid_rows}, 1fr)`
  };

  return (
    // Grid container
    <div className="calendar" style={styles.calendar}>
      <h3 className="day title">Monday</h3>
      <h3 className="day title">Tuesday</h3>
      <h3 className="day title">Wednesday</h3>
      <h3 className="day title">Thursday</h3>
      <h3 className="day title">Friday</h3>
      {
        // Dynamically create the number of calendar cells, based on the earliest and latest possible times for all class preferences
        Array.from(Array(NUMBER_OF_GRID_COLUMNS*number_of_grid_rows).keys()).map((i) => (
        <div key={i} className="background-cell" />
      ))}
      
    </div>
  );
}

export default Calendar;