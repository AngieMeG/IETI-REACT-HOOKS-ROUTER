import * as React from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import LogInComponent from './components/LogInComponent';
import TaskViewerComponent from './components/TaskViewerComponent'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/logIn' element={<LogInComponent/>}/>
        <Route exact path='/tasks' element={<TaskViewerComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App;
