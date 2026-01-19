import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard, TemplateDoc, Login, Signup, WorkingDoc, DocFile} from './Components/index.js'
import Template from './pages/Template.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Userlayout from './layout/Userlayout.jsx'
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
          <Template/>
        )
      },
      {
        path: '/template/doc/:id',
        element:(
          <TemplateDoc/>
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
   {
    path: '/dashboard',
    element: <Userlayout/>,
    children: [
      {
        path: '/dashboard',
        element:(
          <Dashboard/>
        )
      },
       {
        path: '/dashboard/workingdoc/:id',
        element:(
          <WorkingDoc/>
        )
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)