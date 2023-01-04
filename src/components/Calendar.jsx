import React, { useState } from 'react';
import Draggable from 'react-draggable';

import CalendarCell from './CalendarCell'
import ClassBlock from './ClassBlock'

import '../css/styles.scss';

import { MilitaryTime } from '../utils/time';
import Semester from '../core/Semester';

const MINUTES_PER_ROW = 30; // duration of a single grid row (also cell) in mins

const NUMBER_OF_GRID_COLUMNS = 5; // 1 for each day, mon - fri
// DAY = 6am to 9pm. This was chosen arbitrarily, assuming that most classes will fit within this time range.
const DAY_START_TIME = new MilitaryTime(6, 0); // 06:00
const DAY_END_TIME = new MilitaryTime(21, 0);  // 21:00
const NUMBER_OF_GRID_ROWS = (DAY_END_TIME.toMinutes() - DAY_START_TIME.toMinutes()) / MINUTES_PER_ROW; // EXCLUDES the header
const CALENDAR_TIMES_ARRAY = representCalendarGridAsArray(NUMBER_OF_GRID_COLUMNS, NUMBER_OF_GRID_ROWS, DAY_START_TIME, MINUTES_PER_ROW);


const Calendar = (props) => {
  const semester = new Semester(props.data);

  let styles = {}; // 'namespace' for all inline styles

  /*************************
   *         STYLES        *
   *************************/
  styles.template = {
    gridTemplateColumns: `repeat(${NUMBER_OF_GRID_COLUMNS}, 2fr)`,
    gridTemplateRows: `2fr repeat(${NUMBER_OF_GRID_ROWS}, 1fr)`
  };

  return (
    <div className="calendar">
      <div className="template" style={styles.template}>
        <h3 className="day title">Monday</h3>
        <h3 className="day title">Tuesday</h3>
        <h3 className="day title">Wednesday</h3>
        <h3 className="day title">Thursday</h3>
        <h3 className="day title">Friday</h3>
        {
           // Todo: Map CALENDAR_TIMES_ARRAY to a background cell + any relevant subjects
           CALENDAR_TIMES_ARRAY.map((element, index) => {
            return (
              <CalendarCell key={index}>
                {element.start_time}
              </CalendarCell>
            )
           })
        }
      </div>
    </div>
  );
}

/*
 ---     representCalendarGridAsArray  ---

Represent a CSS grid as an array, for easier mapping. 
        ┌───┬───┬───┬───┬───┐
    6:00┤ 0 │ 1 │ 2 │ 3 │ 4 │
        │   │   │   │   │   │
        ├───┼───┼───┼───┼───┤
    6:30│ 5 │ 6 │ 7 │ 8 │ 9 │ 
        ┤   │   │   │   ├───┼──> array[8] = {
        ├───┼───┼───┼───┼───┤     'day_of_week': 'Thu',
    7:00│10 │11 │12 │13 │14 │     'start_time': '6:30',
        │   │   │   │   │   │     'classes': []
        ├───┼───┼───┼───┼───┤    }
    7:30│15 │16 │17 │18 │19 │
        │   │   │   │   │   │
        └───┴───┴───┴───┴───┘
*/

function representCalendarGridAsArray(columns, rows, calendar_start_time, minutes_per_row) {
  // Two things to note about DAYS: 
  //   1) Each day's index corresponds to its calendar grid index
  //   2) The day's format (i.e. 3 letter starting with caps) follow Allocate+'s data format; see utils/semesters_example.json
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  /*
  What in tarnation are we returning?
   Array.from(Array(columns*rows),         --> Create empty array of size columns*rows
      (element, index) => { ... }          --> ... and map each element of the empty array to its respective calendar data, based on index (see above)
  */
  return Array.from(Array(columns*rows),
    (element, index) => {
      let offset = 1;
      let row_number = 0;
      while (index >= (columns * (row_number + offset))) { row_number++; };
      let day_index = index % columns;
      
      return { 
        'day_of_week': DAYS[day_index],
        'start_time': calendar_start_time.addMinutes(row_number*minutes_per_row).toString(), // toString, to follow Allocate+'s data format
        'classes': []
      };
    }
  );
}

export default Calendar;