import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import App from './App';
import Navbar from './components/Navbar/Navbar';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
