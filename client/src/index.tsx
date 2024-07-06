import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AxiosProvider} from "./store/AxiosContext";
import {AuthProvider} from "./store/AuthContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AuthProvider>
        <AxiosProvider>
            <App/>
        </AxiosProvider>
    </AuthProvider>
);

reportWebVitals();
