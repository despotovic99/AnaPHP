import {createContext, useState} from 'react';
import {AuthContextInterface} from '../common/models/context.interface';
import {Login} from "../common/models/auth.interface";

const AuthContext = createContext({} as AuthContextInterface);
const {Provider} = AuthContext;

const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<Login>({
        accessToken: '',
        authenticated: false,
    });

    const logout = async () => {
        try {
            setAuthState({
                accessToken: '',
                authenticated: false,
            });

            await localStorage.clear();
        } catch (error: any) {
            //TODO process error
            console.log(error);
            // toast.error(error?.response?.data?.message);
        }
    };

    const getAccessToken = () => {
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
