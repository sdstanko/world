import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = AppRouter()

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
