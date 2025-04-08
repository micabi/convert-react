import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './routes/index';
import Help from './routes/help';
import Nomatch from './routes/404';

function App(): React.JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </>
  );
}

export default App;
