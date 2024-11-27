import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <div className='admin-layout'>
        <main>{ children }</main>
    </div>
  )
}

export default AdminLayout