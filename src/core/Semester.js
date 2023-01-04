import { MilitaryTime } from "../utils/time";

class Semester {

  constructor(semester_data) {
    this._semester_data = semester_data
    this._timetable_start_time = this.#getTimeOfEarliestClassOption();
    this._timetable_end_time = this.#getTimeOfLatestClassOption();
    this._all_classes = this.#getAllClasses();
  }

  get timetable_start_time() {
    return this._timetable_start_time;
  }
  get timetable_end_time() {
    return this._timetable_end_time;
  }

  get classes() {
    return this._all_classes;
  }

  #getTimeOfEarliestClassOption() {
    const semester = this._semester_data
    let timetable_start_time = MilitaryTime.fromString("23:59"); // latest possible
  
    for (let course in semester) {
      // Make sure that this course actually has groups before continuing
      if (!Object.keys(semester[course]['groups'])) {
        continue;
      }
      for (let group in semester[course]['groups']) {
        for (let activity of Object.values(semester[course]['groups'][group]['activities'])) {
          let start_time = MilitaryTime.fromString(activity.start_time);
          
          if (start_time.isEarlierThan(timetable_start_time)) {
            Object.assign(timetable_start_time, start_time);
          }
        }
      }
    }
    return timetable_start_time;
  }
  /**
   * @returns MilitaryTime
   */
  #getTimeOfLatestClassOption() {
    const semester = this._semester_data
    let timetable_end_time = MilitaryTime.fromString("00:00") // earliest possible
  
    for (let course in semester) {
      if (!Object.keys(semester[course]['groups'])) {
        continue;
      }
      for (let group in semester[course]['groups']) {
        for (let activity of Object.values(semester[course]['groups'][group]['activities'])) {
          let start_time = MilitaryTime.fromString(activity.start_time);

          let end_time = start_time.addMinutes(Number(activity.duration));
          if (!end_time.isEarlierThan(timetable_end_time)) {
            Object.assign(timetable_end_time, end_time);
          }
        }
      }
    }
    return timetable_end_time;
  }

  #getAllClasses() {
    const semester = this._semester_data;
    let classes = [];
    for (let course in semester) {
      // Make sure that this course actually has groups before continuing
      if (!Object.keys(semester[course]['groups'])) {
        continue;
      }
      for (let group in semester[course]['groups']) {
        for (let activity in semester[course]['groups'][group]['activities']) {
          semester[course]['groups'][group]['activities'][activity].name = activity;
          classes.push(semester[course]['groups'][group]['activities'][activity]);
        }
      }
    }
    return classes;
  }

}

export default Semester