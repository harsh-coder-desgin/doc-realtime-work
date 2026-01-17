import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Singup.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:(
          <Home />
        )
      },
      {
        path: '/template',
        element:(
          <Home />
        )
      },
    ],
  },
  {
    path: '/login',
    element: (
      // <CreatorAuthLayout>
        <Login />
      // </CreatorAuthLayout>
    ),
  },
   {
    path: '/signup',
    element: (
      // <CreatorAuthLayout>
        <Signup/>
      // </CreatorAuthLayout>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)