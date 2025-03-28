import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { Select } from 'antd';

const App = () => (
  <div className="container">
    <Select></Select>
    <div>Framework: react-18</div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
