import React from 'react'

function UserNavbar() {
  return (
    <div className='w-full border-b border-gray-200'>
      <h1>Logo</h1>
      <div>
        <input placeholder='Search'/>
        <select>
          <option>Personal doc</option>
          <option>Organstion doc</option>
        </select>
      </div>
    </div>
  )
}

export default UserNavbar
