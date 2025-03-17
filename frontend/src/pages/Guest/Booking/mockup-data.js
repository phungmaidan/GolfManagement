export const COURSES = [
  // Các combo sân golf
  {
    id: 'L - P',
    name: '"Lotus - Palm" Course',
    description: 'Experience the best of both worlds with this 36-hole package combining the challenging Lotus Course and the tropical Palm Course.',
    image: 'https://golfhomes.vn/wp-content/uploads/2021/05/san-golf-song-be-3.jpeg',
    holes: 36,
    par: 142, // 72 + 70
    difficulty: 'Challenging',
    isCombo: true
  },
  {
    id: 'P - L',
    name: '"Palm - Lotus" Course',
    description: 'Start with the beginner-friendly Palm Course before taking on the challenging Lotus Course in this 36-hole adventure.',
    image: 'https://alegolf.com/medias/2023/04/Dia-chi-_Vi-tri-Song-Be-Golf-Club.jpg',
    holes: 36,
    par: 142, // 70 + 72
    difficulty: 'Challenging',
    isCombo: true
  },
  {
    id: 'L - D',
    name: '"Lotus - Desert" Course',
    description: 'Challenge yourself with two distinct experiences: the water features of Lotus Course and the sandy terrain of Desert Course.',
    image: 'https://golfhomes.vn/wp-content/uploads/2021/05/san-golf-song-be-3.jpeg',
    holes: 36,
    par: 143, // 72 + 71
    difficulty: 'Expert',
    isCombo: true
  },
  {
    id: 'D - L',
    name: '"Desert - Lotus" Course',
    description: 'Begin with the dramatic Desert Course before moving to the challenging water hazards of the Lotus Course.',
    image: 'https://golf-pass.brightspotcdn.com/dims4/default/f7e400d/2147483647/strip/true/crop/500x323+0+26/resize/930x600!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F14%2F52%2F7ad286dd319457ea3d55f8648660%2F29682.jpg',
    holes: 36,
    par: 143, // 71 + 72
    difficulty: 'Expert',
    isCombo: true
  },
  {
    id: 'D - P',
    name: '"Desert - Palm" Course',
    description: 'Experience contrasting styles with the sandy terrain of the Desert Course followed by the tropical Palm Course.',
    image: 'https://golf-pass.brightspotcdn.com/dims4/default/f7e400d/2147483647/strip/true/crop/500x323+0+26/resize/930x600!/format/webp/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F14%2F52%2F7ad286dd319457ea3d55f8648660%2F29682.jpg',
    holes: 36,
    par: 141, // 71 + 70
    difficulty: 'Intermediate',
    isCombo: true
  },
  {
    id: 'P - D',
    name: '"Palm - Desert" Course',
    description: 'Start easy with the Palm Course before challenging yourself on the Desert Course with its dramatic elevation changes.',
    image: 'https://alegolf.com/medias/2023/04/Dia-chi-_Vi-tri-Song-Be-Golf-Club.jpg',
    holes: 36,
    par: 141, // 70 + 71
    difficulty: 'Intermediate',
    isCombo: true
  },
  
  // Walk-in option
  {
    id: 'WALK IN',
    name: 'Walk In',
    description: 'No reservation needed. Simply arrive at the course, and we\'ll accommodate you on the next available tee time.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    holes: 'Varies',
    par: 'Varies',
    difficulty: 'Varies',
    isWalkIn: true
  }
]

export const TIME_SLOTS = [
  // Morning flights - 18 slots
  { id: 1, time: '05:00', available: 3, category: 'morning' },
  { id: 2, time: '05:20', available: 2, category: 'morning' },
  { id: 3, time: '05:40', available: 4, category: 'morning' },
  { id: 4, time: '06:00', available: 0, category: 'morning' },
  { id: 5, time: '06:20', available: 1, category: 'morning' },
  { id: 6, time: '06:40', available: 2, category: 'morning' },
  { id: 7, time: '07:00', available: 0, category: 'morning' },
  { id: 8, time: '07:20', available: 4, category: 'morning' },
  { id: 9, time: '07:40', available: 3, category: 'morning' },
  { id: 10, time: '08:00', available: 2, category: 'morning' },
  { id: 11, time: '08:20', available: 1, category: 'morning' },
  { id: 12, time: '08:40', available: 0, category: 'morning' },
  { id: 13, time: '09:00', available: 3, category: 'morning' },
  { id: 14, time: '09:20', available: 4, category: 'morning' },
  { id: 15, time: '09:40', available: 2, category: 'morning' },
  { id: 16, time: '10:00', available: 1, category: 'morning' },
  { id: 17, time: '10:20', available: 0, category: 'morning' },
  { id: 18, time: '10:40', available: 3, category: 'morning' },
  
  // Afternoon flights - 18 slots
  { id: 19, time: '11:00', available: 2, category: 'afternoon' },
  { id: 20, time: '11:20', available: 4, category: 'afternoon' },
  { id: 21, time: '11:40', available: 1, category: 'afternoon' },
  { id: 22, time: '12:00', available: 0, category: 'afternoon' },
  { id: 23, time: '12:20', available: 3, category: 'afternoon' },
  { id: 24, time: '12:40', available: 2, category: 'afternoon' },
  { id: 25, time: '13:00', available: 4, category: 'afternoon' },
  { id: 26, time: '13:20', available: 0, category: 'afternoon' },
  { id: 27, time: '13:40', available: 1, category: 'afternoon' },
  { id: 28, time: '14:00', available: 3, category: 'afternoon' },
  { id: 29, time: '14:20', available: 2, category: 'afternoon' },
  { id: 30, time: '14:40', available: 0, category: 'afternoon' },
  { id: 31, time: '15:00', available: 4, category: 'afternoon' },
  { id: 32, time: '15:20', available: 3, category: 'afternoon' },
  { id: 33, time: '15:40', available: 1, category: 'afternoon' },
  { id: 34, time: '16:00', available: 2, category: 'afternoon' },
  { id: 35, time: '16:20', available: 0, category: 'afternoon' },
  { id: 36, time: '16:40', available: 4, category: 'afternoon' }
]