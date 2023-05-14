import React from "react";
import UsersPage from "../pages/UsersPage";
import DrawerContainer from "./DrawerContainer";
import '../styles/BasicLayoutStyle.css';
import {ScreenNames} from "../common/constants/ScreenNames";
import AddOrEditUserPage from "../pages/AddOrEditUserPage";
import TasksPage from "../pages/TasksPage";
import AddOrEditTaskPage from "../pages/AddOrEditTaskPage";

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
            </div>
        </div>
    )
}

export default BasicLayout;
