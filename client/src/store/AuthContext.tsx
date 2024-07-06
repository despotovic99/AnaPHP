import {createContext, useState} from 'react';
import {AuthContextInterface} from '../common/models/context.interface';
import {Login} from "../common/models/auth.interface";
import {toast} from "react-toastify";

const AuthContext = createContext({} as AuthContextInterface);
const {Provider} = AuthContext;

const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<Login>({
        accessToken: '',
        authenticated: false,
        roleName: ''
    });

    const logout = async () => {
        try {
            setAuthState({
                accessToken: '',
                authenticated: false,
                roleName: ''
            });

            await localStorage.clear();
        } catch (error: any) {
            toast.error(error?.response?.data?.data.error);
        }
    };

    const getAccessToken = (): string => {
        return authState.accessToken;
    };

    const setAuth = (loginObject: Login) => {
        setAuthState(loginObject);
    };

    return (
        <Provider
            value={{
                authState,
                getAccessToken,
                setAuth,
                logout,
            }}>
            {children}
        </Provider>
    );
};

export {AuthContext, AuthProvider};
