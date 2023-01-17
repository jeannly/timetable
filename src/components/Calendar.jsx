import React, { useState, useEffect } from 'react';

import CalendarCell from './CalendarCell'

import '../css/styles.scss';

import Event from './Event';

// the calendar + classes data is represented as you would expect visually

// options = {
//   'days': <Array>,
//   'minutes_per_row': <Int>,
//   'day_start_time': <MilitaryTime>,
//   'day_end_time': <MilitaryTime>,
// };

// events_data = {
//  "Mon12:30": Event[],
//  ..."DddHH:MM": Event[]
// }
// --> where Event = {
//     "title": String,
//     "description": String,
//     "location": String,
//     "start_time": String,
//     "duration": Int,
//     "confirmed": Bool
// }

const Calendar = ({options, events_data}) => {
  const NUMBER_OF_GRID_COLUMNS = options.days.length; // 1 column for each day
  const NUMBER_OF_GRID_ROWS = (options.day_end_time.toMinutes() - options.day_start_time.toMinutes()) / options.minutes_per_row; // EXCLUDES the header
  const HEADERS = options.days.map((name) => <h3 className="day title" key={name}>{name}</h3>);
  
  const GRID_ARRAY = createGridArray(NUMBER_OF_GRID_COLUMNS, NUMBER_OF_GRID_ROWS, options.day_start_time, options.minutes_per_row, options.days);
  let styles = {}; // 'namespace' for all inline styles

  /*************************
   *         STYLES        *
   *************************/
  styles.template = {
    gridTemplateColumns: `repeat(${NUMBER_OF_GRID_COLUMNS}, 2fr)`,
    gridTemplateRows: `1fr repeat(${NUMBER_OF_GRID_ROWS}, 1fr)`
  };

  return (
    <div className="calendar">
      <div className="template" style={styles.template}>
        { HEADERS }
        {GRID_ARRAY.map((day_time) => {
          let events_for_this_day_and_time = null;
          if (events_data.hasOwnProperty(day_time)) {
            events_for_this_day_and_time = events_data[day_time].map((event) => <Event key={event.name + event.description + event.location} data={event} />)
          }

          return (
            <CalendarCell key={day_time}>
              {events_data.hasOwnProperty(day_time) && events_for_this_day_and_time}
            </CalendarCell>
          );
        })}
      </div>
    </div>
  );
}

/*
creates an array as such:
["Mon6:00", "Tue6:00", "Wed6:00", "Thu6:00", "Fri6:00", "Mon6:30", "Tue6:30","Wed6:30","Thu6:30","Fri6:30"]
...
and so on and so forth: from start_time to end_time, in intervals of minutes_per_row.
This matches the Allocate+ data formatting
*/
function createGridArray(columns, rows, start_time, minutes_per_row, days) {
  // Format `days` so that the format is always Ddd -> 3 letters with first letter uppercase, 
  //  e.g. MOnday = Mon, TUES = Tue
  let formatted_days = days.map((day) => {
    return (day.toUpperCase()[0] + day.toLowerCase().substring(1,3))
  });

  let array = []
  let time = start_time;

  for (let cell = 0; cell < columns*rows; cell++) {
    if (cell % formatted_days.length === 0 && cell !== 0) {
      time = time.addMinutes(minutes_per_row);
    }
    let day = formatted_days[cell % days.length];
    array[cell] = day + time.toString();
  }

  return array;
}

export default Calendar;