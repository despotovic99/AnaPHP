import {createContext, useContext} from 'react';
import {InternalAxiosRequestConfig} from "axios";
import axiosInstance from "../api/axios";
import {AuthContext} from "./AuthContext";

const AxiosContext = createContext({});

const {Provider} = AxiosContext;

const AxiosProvider = ({children}: any) => {
    const authContext = useContext(AuthContext);

    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            if (config.headers && !config.headers?.Authorization) {
                config.headers.Authorization = `Bearer ${
                    authContext.getAccessToken()
                }`;
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        },
    );

    return <Provider value={{axiosInstance: axiosInstance}}>{children}</Provider>;
};

export {AxiosContext, AxiosProvider};
