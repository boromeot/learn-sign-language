import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home/home.jsx';
import App from './App.jsx';
import Lessons from './routes/lessons/lessons.jsx';
import ErrorPage from './error-page.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/lessons',
    element: <Lessons />
  },
  {
    path: '/lessons/:lessonId',
    element: <App />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
