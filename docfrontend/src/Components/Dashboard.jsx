import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { PersonalDoc, OrgansationDashboard } from './index.js'
import { useSelector } from 'react-redux';

function Dashboard() {
  const { data } = useOutletContext()
  const users = useSelector(state => state.userAuth.users)
  console.log(users);
  
  return (
    <div>
      {data === "Personal" ? <PersonalDoc data={data} /> : <OrgansationDashboard data={data} />}
    </div>
  )
}

export default Dashboard
