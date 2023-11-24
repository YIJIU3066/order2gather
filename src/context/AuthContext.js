import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

  const BASE_URL = (window.location.origin === "http://localhost:3000" ? "http://localhost:8000" : window.location.origin)

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
        ? JSON.parse(localStorage.getItem("accessToken"))
        : null
  )

  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
        ? JSON.parse(localStorage.getItem("refreshToken"))
        : null
  )

  const [user, setUser] = useState(() =>
    localStorage.getItem("accessToken")
        ? jwtDecode(JSON.parse(localStorage.getItem("accessToken")))
        : null
  )
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (access_token) => {
    let response = null
    try {
      response = await axios({
        url: BASE_URL + "/api/auth/login", // to be corrected
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
          access_token
        })
      })

      if (response.status === 200) {
        setAccessToken(response.data.access)
        setRefreshToken(response.data.refresh)
        setUser(jwtDecode(response.data.access))
        localStorage.setItem("accessToken", JSON.stringify(response.data.access))
        localStorage.setItem("refreshToken", JSON.stringify(response.data.refresh))
        return 'success'
      } else {

        return response.data.message

      }

    } catch (error) {

      return error.response.data.message

    }

    
  };

  const logoutUser = () => {
    setAccessToken(null)
    setRefreshToken(null)
    setUser(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate('/')
  }

  const getRefreshToken = async () => {
    const response = await axios.post('api/auth/refresh/', { // url to be corrected
        refresh: refreshToken,
    });
    return response.data;
  }

  const contextData = {
    user,
    setUser,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    loginUser,
    logoutUser,
    getRefreshToken
  }

  useEffect(() => {
    if (accessToken) {
      setUser(jwtDecode(accessToken))
    }
    setLoading(false)
  }, [accessToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}