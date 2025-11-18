import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import {
  CheckIn, Header, Home, MakeAppointment, Queue, LoginButton,
} from './components'
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import Edit from "./components/edit";
import PatientConfirm from "./components/PatientConfirm";


function App() {
// Returns the main App component with routing to different pages
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/CheckIn' element={<CheckIn/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/MakeAppointment' element={<MakeAppointment/>} />
        <Route path='/Queue' element={<Queue/>} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/PatientConfirm/:id" element={<PatientConfirm/>} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>

    </div>
  );
}

export default App;
