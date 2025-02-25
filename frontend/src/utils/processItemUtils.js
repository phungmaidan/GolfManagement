const processItemFlightTable = (item) => {
  const blockMap = item.children.blockMap
  const bookMap = item.children.bookMap
  const isBlock = blockMap?.length > 0
  const isBook = bookMap?.length > 0

  let players = Array(4).fill(null)
  let isBlockRow = false
  let bookingIndices = Array(4).fill(null)
  let currentIndex = 0

  if (isBlock) {
    isBlockRow = true
    players = Array(4).fill(blockMap[0].Remark)
  } else if (isBook) {
    bookMap.forEach((booking, bookingIndex) => {
      const details = booking.details || []
      details.forEach((detail) => {
        if (currentIndex < 4) {
          players[currentIndex] = `${detail?.MemberNo} ${detail.Name}`
          bookingIndices[currentIndex] = bookingIndex
          currentIndex++
        }
      })
    })
  }

  return {
    ...item,
    players,
    isBlockRow,
    bookingIndices
  }
}

export const processItemUtils = {
  processItemFlightTable
}