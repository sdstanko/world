import React, { useState } from 'react';
import Map from './pages/Map/Map'
import Navbar from './components/Navbar/Navbar';
import './App.scss'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router';

function App() {
    const router = AppRouter()
    
    return (
        <div className='app'>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
