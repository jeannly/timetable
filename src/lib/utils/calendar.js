function insertLessonInto(week, lesson) {
  let lesson_option = lesson;
  if (!lesson.times) {
    return;
  }
  // campus, day, duration, popularity, time
  for (let timeslot of lesson.times) {
    lesson_option['campus'] = timeslot['campus'];
    lesson_option['day'] = timeslot['day'];
    lesson_option['duration'] = timeslot['duration'];
    lesson_option['popularity'] = timeslot['popularity'];
    lesson_option['time'] = timeslot['time'];
    week[lesson_option['day']].push(lesson_option);
    console.log(lesson_option);
    console.log("into");
    console.log(week);
  }
  return;
}

// Reduce the array (timetable) of objects (subject)
// Put all the subjects into their corresponding day
export default function getWeek(timetable) {
  let week = [[],[],[],[],[]];

  for (let lesson of timetable) {
    insertLessonInto(week, lesson);
  }
  return week;
}