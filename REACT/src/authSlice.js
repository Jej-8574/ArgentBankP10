import { createSlice } from '@reduxjs/toolkit'

// Charger le token depuis sessionStorage au démarrage
const tokenFromStorage = sessionStorage.getItem('token')

const initialState = {
token: tokenFromStorage || null,
isAuthenticated: !!tokenFromStorage,
user: null,
loading: false,
error: null,
}

const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
setLoading(state, action) {
state.loading = action.payload
},
setError(state, action) {
state.error = action.payload
},
loginSuccess(state, action) {
state.token = action.payload
state.isAuthenticated = true
state.error = null
// Sauvegarder le token dans sessionStorage
sessionStorage.setItem('token', action.payload)
},
setUser(state, action) {
state.user = action.payload
},
logout(state) {
state.token = null
state.isAuthenticated = false
state.user = null
state.loading = false
state.error = null
// Supprimer le token de sessionStorage
sessionStorage.removeItem('token')
},
},
})

export const { setLoading, setError, loginSuccess, setUser, logout } =
authSlice.actions

export default authSlice.reducer