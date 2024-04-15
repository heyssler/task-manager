import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskManager from './components/TaskManager';
import React from 'react';


function App() {
  return (
    <div className="container">
      <TaskManager />
    </div>
  );
}

export default App;