import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checkbox from './atoms/checkbox/checkbox';
import { Category } from './atoms/category';

export interface ICategory {
  name: string;
  color: string;
  id: number;
}

const categories: Record<string, ICategory> = {
  1: {
    name: 'groceries',
    color: '#27AE60',
    id: 1,
  },
};
function App() {
  return (
    <div className="App">
      <Checkbox checked={true} />
      <Category {...Object.values(categories)[0]} />
    </div>
  );
}

export default App;
