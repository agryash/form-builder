import React from 'react'
import Builder from './Builder'
import Userform from './Userform'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Builder />} />
          <Route path="submit" element={<Userform />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
