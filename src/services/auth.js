export const getToken = () => localStorage.getItem('@fatec/jwt')
export const login = (token, user) => {
  localStorage.setItem('@fatec/jwt', token)
  localStorage.setItem('@fatec/dataUser', user)
}
export const logout = () => {
  localStorage.removeItem('@fatec/jwt')
}

export const isAuthenticated = () => localStorage.getItem('@fatec/jwt') !== null
