import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../authSlice'
import Home from '../pages/Home/Home.jsx'
import Signin from '../pages/SignIn/SignIn.jsx'
import User from '../pages/User/User.jsx'

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  // Récupérer les données user au chargement si un token existe
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await response.json()
          if (response.ok) {
            dispatch(setUser(data.body))
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du profil:', error)
        }
      }
    }

    fetchUserProfile() 
  }, [token, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/user" element={<User />} />
    </Routes>
  )
}

export default App