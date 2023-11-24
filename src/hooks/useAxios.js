import axios from "axios"
import dayjs from "dayjs"
import { jwtDecode } from "jwt-decode"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"


const useAxios = () => {
  const { accessToken, setAccessToken, user, setUser, logoutUser, refreshToken, getRefreshToken, setRefreshToken } = useContext(AuthContext)
  const baseUrl = (window.location.origin === "http://localhost:3000" ? "http://localhost:8000" : window.location.origin) + "/api/user"
  
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  axiosInstance.interceptors.request.use(async req => {

    if (user == null || dayjs.unix(jwtDecode(refreshToken).exp).diff(dayjs()) < 7) logoutUser(); // expire time to be corrected
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 360 // expire time to be corrected
    if (isExpired) {
      const { access, refresh } = await getRefreshToken();

      setAccessToken(access);
      setUser(jwtDecode(access));
      setRefreshToken(refresh);
      localStorage.setItem("accessToken", JSON.stringify(access));
      localStorage.setItem("refreshToken", JSON.stringify(refresh));

      req.headers.Authorization = `Bearer ${access}`;
    }

    return req
  })

  return axiosInstance
}

export default useAxios