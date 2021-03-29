export const getToken = () => localStorage.getItem('jwt')
export const login = (token, user) => {
  localStorage.setItem('jwt', token)
  localStorage.setItem('dataUser', user)
}
export const logout = () => {
  localStorage.removeItem('jwt')
}

export const isAuthenticated = () => localStorage.getItem('jwt') !== null
