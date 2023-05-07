import '../styles/DrawerContainerStyle.css'
import {faObjectGroup, faSignOut, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DrawerContainer = () => {
    return (
        <div className={'drawer-container'}>
            <div className={'drawer-items-container'}>
                <div className={'drawer-item-container inactive'}>
                    <FontAwesomeIcon icon={faUser} className={'icon'}/>
                    <p>Users</p>
                </div>
                <div className={'drawer-item-container inactive'}>
                    <FontAwesomeIcon icon={faTasks} className={'icon'}/>
                    <p>Tasks</p>
                </div>
                <div className={'drawer-item-container inactive'}>
                    <FontAwesomeIcon icon={faObjectGroup} className={'icon'}/>
                    <p>Task Groups</p>
                </div>
                <div className={'drawer-item-container active'}>
                    <FontAwesomeIcon icon={faSignOut} className={'icon'}/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default DrawerContainer;
