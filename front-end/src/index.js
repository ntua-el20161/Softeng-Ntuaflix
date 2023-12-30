import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import TitleInfo from './pages/TitleInfo'
import NameInfo from './pages/NameInfo'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/title/:titleID",
    element: <TitleInfo/>,
  },
  {
    path: "/name/:nameID",
    element: <NameInfo/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <RouterProvider router={router}/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
