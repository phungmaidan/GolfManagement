import React from 'react'

import { useSelector } from 'react-redux'
import { selectIsStaff } from '~/redux/user/userSlice'
import StaffDashBoard from './StaffDashBoard/StaffDashBoard'
import GuestDashBoard from './GuestDashBoard/GuestDashBoard'

const Dashboard = () => {
  const isStaff = useSelector(selectIsStaff)
  return (
    <>
      {isStaff ? <StaffDashBoard /> : <GuestDashBoard />}
    </>
  )
}

export default Dashboard
