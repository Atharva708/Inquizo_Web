
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './Login';
import Forms from './Forms';



function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </div>
  );
}

export default App;
