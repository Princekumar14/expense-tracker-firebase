import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/expense-tracker';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={< ExpenseTracker/>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
