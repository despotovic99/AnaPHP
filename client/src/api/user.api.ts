import {LoginDto, RegisterDto} from "../common/dtos/auth.interface.dto";
import axiosInstance from "./axios";

export async function loginUserRequest(data: LoginDto) {
    return await axiosInstance.post('/login.php', data);
}

export async function registerUserRequest(data: RegisterDto) {
    return await axiosInstance.post('/register.php', data)
}
