
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LocationList from './components/LocationList'; // Import your components
import EventsPage from './components/EventsPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/events/:locationId" element={<EventsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
