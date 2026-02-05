import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard, TemplateDoc, Login, Signup, WorkingDoc, DocFile, OrganstionMange, OrgansationDoc,Userauthlayout} from './Components/index.js'
import store from './store/store.js'
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
        element: (
        <Userauthlayout>
          <Home />
        </Userauthlayout> 
        )
      },
      {
        path: '/template',
        element: (
        <Userauthlayout>
          <Template />
        </Userauthlayout> 
        )
      },
      {
        path: '/template/doc/:id',
        element: (
        <Userauthlayout>
          <TemplateDoc />
        </Userauthlayout> 
        )
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Userauthlayout>
        <Login />
      </Userauthlayout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Userauthlayout>
        <Signup />
       </Userauthlayout>
    ),
  },
  {
    path: '/dashboard',
    element: <Userlayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <Userauthlayout>
            <Dashboard />
          </Userauthlayout>
        )
      },
      {
        path: '/dashboard/workingdoc/:id',
        element: (
          <Userauthlayout>
            <WorkingDoc />
          </Userauthlayout>
        )
      },
      {
        path: '/dashboard/orgdoc',
        element: (
          <Userauthlayout>
            <OrgansationDoc/>
          </Userauthlayout> 
        )
      },
      {
        path: '/dashboard/orgdoc/:id',
        element: (
           <Userauthlayout>
            <OrganstionMange/>
           </Userauthlayout>
        )
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)