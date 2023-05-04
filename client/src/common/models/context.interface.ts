import {Login} from "./auth.interface";

export interface AuthContextInterface {
    getAccessToken: () => {};
    authState: Login;
    setAuth: (loginObject: Login) => void;
    logout: () => {};
}


