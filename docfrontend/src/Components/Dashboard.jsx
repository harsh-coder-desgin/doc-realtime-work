import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { PersonalDoc, OrgansationDashboard } from './index.js'

function Dashboard() {
  const { data } = useOutletContext()

  return (
    <div>
      {data === "Personal" ? <PersonalDoc data={data} /> : <OrgansationDashboard data={data} />}
    </div>
  )
}

export default Dashboard
