
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';

function App() {
  return (
    <div className="App">
 <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/country" element={<NewAnnouncement />} />
          <Route path="/autosalon" element={<AutoSalons/>} />
          <Route path="/detail" element={<Detail/>} /> */}
        </Routes>
    </div>
  );
}

export default App;
