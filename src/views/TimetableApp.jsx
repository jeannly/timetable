
import { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

// Components
import Sidebar from '../components/Sidebar';
import SidebarCard from '../components/SidebarCard';
import Calendar from '../components/Calendar';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

const TimetableApp = () => { 
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [selected_semester, setSelectedSemester] = useState(null);

  const data = queryParams.get('data');
  let semesters = null;

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
    <div className="App">
    <Sidebar>
      <SidebarCard>
        <h1>Timetable Customiser</h1>
      </SidebarCard>
      <SidebarCard>
        <p>Use this to easily view your timetable preference options. Start by selecting a semester below.
        </p>
        <Dropdown options={Object.keys(semesters)} handleDropdownChange={({target}) => { setSelectedSemester(target.value) }}/>
      </SidebarCard>
    </Sidebar>
    <main id="content">
      {selected_semester && 
      <Calendar data={semesters[selected_semester]}>

      </Calendar>}
    </main>
  </div>
  );
}

export default TimetableApp;