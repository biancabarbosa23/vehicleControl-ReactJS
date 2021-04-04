export const getToken = () => localStorage.getItem('@fatec/jwt')
export const getUser = () => JSON.parse(localStorage.getItem('@fatec/dataUser'))
export const login = (token, user) => {
  localStorage.setItem('@fatec/jwt', token)
  localStorage.setItem('@fatec/dataUser', JSON.stringify(user))
}
export const logout = () => {
  localStorage.removeItem('@fatec/jwt')
  localStorage.removeItem('@fatec/dataUser')
}

export const isAuthenticated = () => localStorage.getItem('@fatec/jwt') !== null
