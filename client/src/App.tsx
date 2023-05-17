import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import BasicLayout from "./UI/BasicLayout";
import {ScreenNames} from "./common/constants/ScreenNames";
import {AuthContext} from "./store/AuthContext";


function App() {
    const authContext = useContext(AuthContext);

    const handleAuth = (screen: string) => {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true'
        return isLoggedIn ? <BasicLayout screenName={screen}/> : <Navigate replace={true} to={'/login'}/>
    }

    useEffect(() => {
    }, [authContext.authState.accessToken])

    return (
        <Router basename={process.env.REACT_APP_BASENAME}>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path={'/'}
                       element={handleAuth(ScreenNames.usersScreen)}/>
                <Route path={'/user'} element={handleAuth(ScreenNames.userScreen)}/>
                <Route path={'/tasks'} element={handleAuth(ScreenNames.tasksScreen)}/>
                <Route path={'/task'} element={handleAuth(ScreenNames.taskScreen)}/>
                <Route path={'/task-groups'} element={handleAuth(ScreenNames.taskGroupsScreen)}/>
            </Routes>
        </Router>
    );
}

export default App;
