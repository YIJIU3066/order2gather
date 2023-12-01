import axios from "axios"
import dayjs from "dayjs"
import { jwtDecode } from "jwt-decode"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"


const useAxios = () => {
  const { accessToken, user, logoutUser } = useContext(AuthContext)
  const baseUrl = (window.location.origin === "http://localhost:3000" ? "http://localhost:8080" : window.location.origin)
  
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { authorization: `Bearer ${accessToken}` }
  })

  axiosInstance.interceptors.request.use(async req => {

    if (user == null) logoutUser(); 
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < (1 / 24);
    if (isExpired) logoutUser();

    return req
  })

  return axiosInstance
}

export default useAxios