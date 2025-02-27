export const getDefaultFormValues = (bookingFlight, selectedCourse, selectedDate, currentUser) => {
  const bookingIndex = bookingFlight?.bookingIndex || 0
  const bookMap = bookingFlight?.bookMap?.[bookingIndex] || {}

  return {
    BookingInfo: {
      bookingId: bookMap.BookingID || '',
      bookingDate: new Date().toISOString().split('T')[0]
    },
    CourseInfo: {
      courseId: selectedCourse || '',
      teeBox: bookingFlight?.TeeBox || '',
      Session: bookingFlight?.Session || '',
      teeTime: bookingFlight?.teeTime || '',
      playDate: selectedDate || '',
      group: bookMap.GroupName || '',
      hole: bookMap.Hole || ''
    },
    IDInfo: {
      userId: bookMap.UserID || currentUser
    },
    GuestList: bookMap.details?.map(guest => ({
      GuestID: String(guest?.GuestID || ''),
      Name: guest?.Name || '',
      MemberNo: guest?.MemberNo || '',
      GuestType: guest?.GuestType || '',
      DailyNo: guest?.BagTag || '',
      Caddy: guest?.CaddyNo || '',
      BuggyNo: guest?.BuggyNo || '',
      LockerNo: guest?.LockerNo || '',
      Rnd: guest?.Rnd || ''
    })) || Array(4).fill({
      GuestID: '',
      Name: '',
      MemberNo: '',
      GuestType: '',
      DailyNo: '',
      Caddy: '',
      BuggyNo: '',
      LockerNo: '',
      Rnd: ''
    }),
    OtherInfo: {
      ContactPerson: bookMap.ContactPerson || '',
      Email: bookMap.Email || '',
      ContactNo: bookMap.ContactNo || '',
      Fax: bookMap.Fax || '',
      CreditCardNumber: bookMap.CreditCardNumber || '',
      CreditCardExpiry: bookMap.CreditCardExpiry || '',
      SalesPerson: bookMap.SalesPerson || '',
      ReferenceID: bookMap.ReferenceID || '',
      Remark: bookMap.Remark || ''
    }
  }
}