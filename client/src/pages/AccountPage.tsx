import React from 'react'
import AvatarBar from '../components/AvatarBar'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

interface Props {}

const AccountPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className='sticky top-0 z-50'>
        <Navbar />
      </nav>
      <div>
        <AvatarBar />
      </div>
      <main className="max-w-full mx-auto">
        <Table />
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default AccountPage