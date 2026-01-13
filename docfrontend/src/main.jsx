import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DocFile from './Components/DocFile.jsx'
import Home from './Components/Home.jsx'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:
        // <UserAuthLayout>
          <DocFile/>
        // </UserAuthLayout>
      },
       {
        path: '/home',
        element:
        // <UserAuthLayout>
          <Home/>
        // </UserAuthLayout>
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
