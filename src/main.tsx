import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Favorites from './pages/Favorites';
import MisGif from './pages/MyGIF';
import NewGif from './pages/NewGIF';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/misgif',
    element: <MisGif />,
  },
  {
    path: '/newgif',
    element: <NewGif />,
  },
]);

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
