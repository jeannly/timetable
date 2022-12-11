import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

// Views
import LandingPage from './views/LandingPage';
import TimetableApp from './views/TimetableApp';

function App() {
  return (
    <Router>
    <Route exact path="/">
      <LandingPage />
    </Route>
    <Route path="/app">
      <TimetableApp />
    </Route>
    </Router>
  );
}

export default App;
