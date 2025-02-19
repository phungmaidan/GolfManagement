import React from 'react'
import TopNavigation from './TopNavigation/TopNavigation'
import ContentArea from './ContentArea/ContentArea'

function MainContent() {
  return (
    <div className="flex flex-col flex-1">
      {/* Top Navigation */}
      <TopNavigation />
      {/* Content Area */}
      <ContentArea/>
    </div>
  )
}

export default MainContent
