import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Lessons from './routes/lessons/lessons.jsx'
import './index.css'
import ErrorPage from './error-page.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>HOME PAGE</div>,
    errorElement: <ErrorPage />
  },
  {
    path: '/lessons',
    element: <Lessons />
  },
  {
    path: '/app',
    element: <App />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
