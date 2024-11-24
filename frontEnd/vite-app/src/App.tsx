import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ServerList from './components/serverList';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<ServerList />} />
      </Routes>
      <footer style={{ textAlign: 'center', padding: '10px', background: '#f0f0f0' }}>
  <p>All rights reserved to John Bryce Training Ltd. from the Matrix Group</p>
</footer>
    </Router>
  );
}

export default App;