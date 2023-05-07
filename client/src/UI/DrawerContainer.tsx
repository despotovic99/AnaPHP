import '../styles/DrawerContainerStyle.css'
import {faObjectGroup, faSignOut, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {ScreenNames} from "../common/constants/ScreenNames";

const DrawerContainer = () => {
    const navigate = useNavigate();

    const navigationHandler = (screen: string) => {
        navigate(screen);
    }

    const logoutHandler = async () => {
        await localStorage.clear();
        //TODO call api
        navigate('/login');
    }

    return (
        <div className={'drawer-container'}>
            <div className={'drawer-items-container'}>
                <div className={'drawer-item-container inactive'}
                     onClick={navigationHandler.bind(this, ScreenNames.usersScreen)}>
                    <FontAwesomeIcon icon={faUser} className={'icon'}/>
                    <p>Users</p>
                </div>
                <div className={'drawer-item-container inactive'}
                     onClick={navigationHandler.bind(this, ScreenNames.tasksScreen)}>
                    <FontAwesomeIcon icon={faTasks} className={'icon'}/>
                    <p>Tasks</p>
                </div>
                <div className={'drawer-item-container inactive'}
                     onClick={navigationHandler.bind(this, ScreenNames.taskGroupsScreen)}>
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
