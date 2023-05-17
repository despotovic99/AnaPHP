import React from "react";
import UsersPage from "../pages/UsersPage";
import DrawerContainer from "./DrawerContainer";
import '../styles/BasicLayoutStyle.css';
import {ScreenNames} from "../common/constants/ScreenNames";
import AddOrEditUserPage from "../pages/AddOrEditUserPage";
import TasksPage from "../pages/TasksPage";
import AddOrEditTaskPage from "../pages/AddOrEditTaskPage";
import TaskGroupsPage from "../pages/TaskGroupsPage";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

type BasicLayoutProps = {
    screenName: string
}
const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
    return (
        <div className={'layout-container'}>
            <DrawerContainer/>
            <div className={'layout-card'}>
                <div className={'layout-top-stripe'}/>
                {props.screenName === ScreenNames.usersScreen && <UsersPage/>}
                {props.screenName === ScreenNames.userScreen && <AddOrEditUserPage/>}
                {props.screenName === ScreenNames.tasksScreen && <TasksPage/>}
                {props.screenName === ScreenNames.taskScreen && <AddOrEditTaskPage/>}
                {props.screenName === ScreenNames.taskGroupsScreen && <TaskGroupsPage/>}
            </div>
            <ToastContainer position={"bottom-right"}/>
        </div>
    )
}

export default BasicLayout;
