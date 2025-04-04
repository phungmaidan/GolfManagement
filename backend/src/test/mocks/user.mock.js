export const mockUser = {
  ID: 'admin',
  Name: 'admin',
  UserGroup: 'Admin',
  Password: 'AS@GBY',
  Level: '0',
  Active: '1'
}

export const mockUsers = [
  mockUser,
  {
    ID: 'Test',
    Name: 'IT Testing',
    UserGroup: 'FI',
    Password: 'AS@',
    Level: '9',
    Active: null
  }
]

export const mockLoginRequest = {
  username: 'admin',
  password: 'AS@GBY'
}

export const mockLoginResponse = {
  status: 'success',
  data: {
    acessToken: 'mock-token',
    refreshToken: 'mock-refresh-token',
    user: {
      id: 'admin',
      name: 'admin',
      UserGroup: 'Admin',
      password: 'AS@GBY',
      level: '0'
    }
  }
}