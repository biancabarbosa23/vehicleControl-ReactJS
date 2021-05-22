export const getToken = () => localStorage.getItem('@fatec/jwt')
export const getUser = () => JSON.parse(localStorage.getItem('@fatec/dataUser'))
export const getAccess = () => localStorage.getItem('@fatec/access')
export const login = (token, user, access) => {
  localStorage.setItem('@fatec/jwt', token)
  localStorage.setItem('@fatec/dataUser', JSON.stringify(user))
  localStorage.setItem('@fatec/access', access)
}
export const logout = () => {
  localStorage.removeItem('@fatec/jwt')
  localStorage.removeItem('@fatec/dataUser')
  localStorage.removeItem('@fatec/access')
}

export const isAuthenticated = () => localStorage.getItem('@fatec/jwt') !== null
