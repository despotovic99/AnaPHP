import '../styles/DrawerContainerStyle.css'
import {faGear, faObjectGroup, faSignOut, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/AuthContext";
import {logoutUserRequest} from "../api/user.api";
import {toast} from "react-toastify";

const DrawerContainer = () => {
    const inactiveDrawerItemClass = 'drawer-item-container inactive';
    const activeDrawerItemClass = 'drawer-item-container active';

    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useContext(AuthContext)
    const [activeDrawerItem, setActiveDrawerItem] = useState('/');
    const [roleName, setRoleName] = useState<string>('');
    const navigationHandler = (screen: string) => {
        navigate(screen);
    }
    const getRole = async () => {
        const role = await localStorage.getItem('role')
        if (!role) return;
        setRoleName(role);
    }
    const logoutHandler = async () => {
        try {
            const token = await localStorage.getItem('token');
            if (!token) return;
            const response = await logoutUserRequest(token);
            console.log(response);
            await localStorage.clear();
            navigate('/login');
        } catch (error: any) {
            toast.error(error.response.data.data.error);
        }
    }

    const getItemContainerClassName = (path: string) => {
        return activeDrawerItem === path ? activeDrawerItemClass : inactiveDrawerItemClass;
    }

    useEffect(() => {
        setActiveDrawerItem(location.pathname);
        getRole();
    }, [location.pathname])

    return (
        <div className={'drawer-container'}>
            <div className={'drawer-items-container'}>
                {roleName?.toLowerCase() === 'admin' && <>
                    <div className={getItemContainerClassName('/')}
                         onClick={navigationHandler.bind(this, '/')}>
                        <FontAwesomeIcon icon={faUser} className={'icon'}/>
                        <p>Users</p>
                    </div>
                    <div className={getItemContainerClassName('/user-roles')}
                         onClick={navigationHandler.bind(this, '/user-roles')}>
                        <FontAwesomeIcon icon={faGear} className={'icon'}/>
                        <p>User Roles</p>
                    </div>
                </>
                }
                <div className={getItemContainerClassName('/tasks')}
                     onClick={navigationHandler.bind(this, '/tasks')}>
                    <FontAwesomeIcon icon={faTasks} className={'icon'}/>
                    <p>Tasks</p>
                </div>
                {roleName.toLowerCase() !== 'izvrsilac' && <div className={getItemContainerClassName('/task-groups')}
                                                                onClick={navigationHandler.bind(this, '/task-groups')}>
                    <FontAwesomeIcon icon={faObjectGroup} className={'icon'}/>
                    <p>Task Groups</p>
                </div>}
                <div className={'drawer-item-container inactive'} onClick={logoutHandler}>
                    <FontAwesomeIcon icon={faSignOut} className={'icon'}/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default DrawerContainer;
