
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useState, useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import Semester from '../core/Semester';
import { MilitaryTime } from '../utils/time';
// Components
import Sidebar from '../components/Sidebar';
import SidebarCard from '../components/SidebarCard';
import Calendar from '../components/Calendar';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

const TimetableApp = () => { 
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  let semesters = null;

  const [selected_semester, setSelectedSemester] = useState(null);
  const [calendar_start_time, setCalendarStartTime] = useState(new MilitaryTime(6, 0));
  const [calendar_end_time, setCalendarEndTime] = useState(new MilitaryTime(21, 0));


  const changeSemester = ({target}) => {
    let new_semester = new Semester(semesters[target.value]);

    setSelectedSemester(new_semester);
    setCalendarStartTime(new_semester.timetable_start_time);
    setCalendarEndTime(new_semester.timetable_end_time);
  }


  const data = queryParams.get('data');
  const CALENDAR_OPTIONS = {
    'days': ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    'minutes_per_row': 30,
    'day_start_time': calendar_start_time,
    'day_end_time': calendar_end_time,
  };

  // todo: add for query parameter 'demo'
  if (data) {
    try {
      semesters = JSON.parse(atob(data));
    } catch(error) {
      console.log(error);
    }
  } else { 
    return ( <Redirect to='/' /> );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Sidebar>
          <SidebarCard>
            <h1>Timetable Customiser</h1>
          </SidebarCard>
          <SidebarCard>
            <p>Use this to easily view your timetable preference options. Start by selecting a semester below.
            </p>
            <Dropdown options={Object.keys(semesters)} handleDropdownChange={changeSemester}/>
          </SidebarCard>
        </Sidebar>
        <main id="content">
          {selected_semester && 
          <Calendar options={CALENDAR_OPTIONS} events_data={selected_semester.classes} />}
        </main>
      </div>
    </DndProvider>
  );
}

export default TimetableApp;