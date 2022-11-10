import logo from './logo.svg';
import './App.scss';

// Components
import Sidebar from './components/Sidebar';
import SidebarCard from './components/SidebarCard';
import Calendar from './components/Calendar';
import Button from './components/Button';

function App() {

  return (
    <div className="App">
      <Sidebar>
        <SidebarCard>
          <h1>Hello!</h1>
          <p>This is some text.</p>
          <Button />
        </SidebarCard>
        <SidebarCard>
          This is another card.
        </SidebarCard>
      </Sidebar>
      <main id="content">
        <Calendar />
      </main>
    </div>
  );
}

export default App;
