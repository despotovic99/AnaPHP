import '../styles/DrawerContainerStyle.css'
import {faObjectGroup, faSignOut, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const DrawerContainer = () => {
    const inactiveDrawerItemClass = 'drawer-item-container inactive';
    const activeDrawerItemClass = 'drawer-item-container active';

    const navigate = useNavigate();
    const location = useLocation();
    const [activeDrawerItem, setActiveDrawerItem] = useState('/');

    const navigationHandler = (screen: string) => {
        navigate(screen);
    }

    const logoutHandler = async () => {
        await localStorage.clear();
        //TODO call api
        navigate('/login');
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
                     onClick={navigationHandler.bind(this, 'task-groups')}>
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
