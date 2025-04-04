/**
 * Cache TTL Constants
 */
export const CACHE_TTL = {
    // CACHE LIFE
    // EXTREMELY LONG TERM: 3200 min + random 10 - 50 min
    EXTREMELY_LONG_TERM: () => 3200 + Math.floor(Math.random() * 3000),
    // LONG TERM: 30 min + random 1-5 min
    LONG_TERM: () => 1800 + Math.floor(Math.random() * 300),
    // SHORT TERM: 5 min + random 1-5 min
    SHORT_TERM: () => 300 + Math.floor(Math.random() * 300)
};

export const GUEST_ATTRIBUTES = [
    'GuestID', // Không cần alias vì Sequelize tự map
    'FullName',
    'CardNumber',
    'IdentityCard',
    'Gender',
    'Contact1',
    'Email1',
    'GuestType'
];