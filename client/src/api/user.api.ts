import {LoginDto, RegisterDto} from "../common/dtos/auth.interface.dto";
import axiosInstance from "./axios";
import axios from "axios";

export async function loginUserRequest(data: LoginDto) {
    return await axiosInstance.post('/login.php', data);
}

export async function registerUserRequest(data: RegisterDto) {
  /*  return await axiosInstance.post('/register.php', data,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length':200
        }
    })*/
    return await axios.post('/register.php', data,{
        baseURL:process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length':200
        }
    })
}
