import React from 'react'
import SideBar from '~/components/DashBoardsContent/SideBar/SideBar'
import MainContent from '~/components/DashBoardsContent/MainContent/MainContent'
function StaffDashBoard() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <MainContent />
      </div>
    </div>
  )
}

export default StaffDashBoard
