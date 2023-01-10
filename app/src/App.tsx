import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checkbox from './atoms/checkbox/checkbox';

function App() {
  return (
    <div className="App">
      <Checkbox checked={true} />
    </div>
  );
}

export default App;
