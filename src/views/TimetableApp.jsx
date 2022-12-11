
import { useLocation } from 'react-router-dom';

// Components
import Sidebar from '../components/Sidebar';
import SidebarCard from '../components/SidebarCard';
import Calendar from '../components/Calendar';
import Button from '../components/Button';

const TimetableApp = () => { 
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const base64_encoded_data = queryParams.get('data');

  const decoded_data = JSON.parse(atob(base64_encoded_data));
  console.log(decoded_data);
  
  return (
    <div className="App">
    <Sidebar>
      <SidebarCard>
        <h1>Hello!</h1>
        <p>This is some text.</p>
        <Button text="Generate" disabled={true} />
      </SidebarCard>
      <SidebarCard>
        This is another card.
      </SidebarCard>
      <SidebarCard>
        Here
      </SidebarCard>
    </Sidebar>
    <main id="content">
      <Calendar />
    </main>
  </div>
  );
}

export default TimetableApp;