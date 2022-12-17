/* 
Functions to be used with the data returned from public/export-data.js.

export-data.js simply returns a subset of all the Allocate+ data,
  (stored in `window.data.student.student_enrolment`),
so these functions should technically work with any data imported from there.

See semesters_example.json for data sample
*/

import { MilitaryTime } from './time.js';

const get_earliest_and_latest_times = (semester) => {
  let earliest_start_time = MilitaryTime.fromString("23:59"); // latest possible
  let latest_end_time = MilitaryTime.fromString("00:00") // earliest possible

  for (let course in semester) {
    for (let group in semester[course]['groups']) {
      for (let activity of Object.values(semester[course]['groups'][group]['activities'])) {
        let start_time = MilitaryTime.fromString(activity.start_time);
        
        if (start_time.isEarlierThan(earliest_start_time)) {
          Object.assign(earliest_start_time, start_time);
        }

        let end_time = start_time.addMinutes(Number(activity.duration));
        if (!end_time.isEarlierThan(latest_end_time)) {
          Object.assign(latest_end_time, end_time);
        }
      }
    }
  }

  return {earliest_start_time, latest_end_time};
}

export { get_earliest_and_latest_times };
