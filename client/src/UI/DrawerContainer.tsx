import '../styles/DrawerContainerStyle.css'
import {faObjectGroup, faSignOut, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/AuthContext";
import {logoutUserRequest} from "../api/user.api";

const DrawerContainer = () => {
    const inactiveDrawerItemClass = 'drawer-item-container inactive';
    const activeDrawerItemClass = 'drawer-item-container active';

    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useContext(AuthContext)
    const [activeDrawerItem, setActiveDrawerItem] = useState('/');

    const navigationHandler = (screen: string) => {
        navigate(screen);
    }

    const logoutHandler = async () => {
        try {
            const token = authContext.authState.accessToken;
            await logoutUserRequest(token);
            await localStorage.clear();
            navigate('/login');
        } catch (error: any) {
            console.log(error);
        }
    }

    const getItemContainerClassName = (path: string) => {
        return activeDrawerItem === path ? activeDrawerItemClass : inactiveDrawerItemClass;
    }

    useEffect(() => {
        setActiveDrawerItem(location.pathname);
    }, [location.pathname])

    return (
        <div className={'drawer-container'}>
            <div className={'drawer-items-container'}>
                <div className={getItemContainerClassName('/')}
                     onClick={navigationHandler.bind(this, '/')}>
                    <FontAwesomeIcon icon={faUser} className={'icon'}/>
                    <p>Users</p>
                </div>
                <div className={getItemContainerClassName('/tasks')}
                     onClick={navigationHandler.bind(this, '/tasks')}>
                    <FontAwesomeIcon icon={faTasks} className={'icon'}/>
                    <p>Tasks</p>
                </div>
                <div className={getItemContainerClassName('/task-groups')}
                     onClick={navigationHandler.bind(this, '/task-groups')}>
                    <FontAwesomeIcon icon={faObjectGroup} className={'icon'}/>
                    <p>Task Groups</p>
                </div>
                <div className={'drawer-item-container inactive'} onClick={logoutHandler}>
                    <FontAwesomeIcon icon={faSignOut} className={'icon'}/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default DrawerContainer;
