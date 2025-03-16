import { useEffect, useState } from 'react';
import Preloader from "../src/Components/Pre";
import './App.css'
import EmpList from './Components/EmpList';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Preloader load={load} />
        <div className="App">
          <Routes>
            <Route path="/" element={<EmpList />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App