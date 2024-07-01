import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/expense-tracker';
import { AddTransaction } from './components/addTransaction';
import { db } from './firebaseDB/config/firebase-config';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_ALL_TRANSACTIONS } from './constant/constant';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_TRANSACTIONS });
    // console.log("ji");

  },[]);
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={< ExpenseTracker/>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/add-transaction" element={< AddTransaction/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
