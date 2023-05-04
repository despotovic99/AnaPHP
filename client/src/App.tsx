import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import BasicLayout from "./UI/BasicLayout";


function App() {

    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    return (
        <Router basename={process.env.REACT_APP_BASENAME}>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path={'/'} element={isLoggedIn ? <BasicLayout screenName={'HOME_SCREEN'}/> : <LoginPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
