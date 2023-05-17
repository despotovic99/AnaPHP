import {LoginDto, RegisterDto} from "../common/dtos/auth.interface.dto";
import axios from "axios";

export async function loginUserRequest(data: LoginDto) {
    return await axios.post('/login.php', data, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 200
        }
    })
}

export async function registerUserRequest(data: RegisterDto) {
    return await axios.post('/register.php', data, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 200
        }
    })
}

export async function logoutUserRequest(token: string) {
    return await axios.post('/logout.php', {}, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 200
        }
    })
}

export async function sendActivationLinkRequest(data: { username: string }) {
    return await axios.post('/generateActivationLink.php', data, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 200
        }
    });
}
