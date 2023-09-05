import React from 'react';
import { Routes, Route, useLocation, HashRouter as Router } from 'react-router-dom';
import Home from './views/home/index';
import Detail from './views/detail/index';
import Reserve from './views/reserve/index';

function RouterList() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/reserve" element={<Reserve />} />
        
      </Routes>
    </Router>
  );
}

export default RouterList;
