import React from "react";
import UsersPage from "../pages/UsersPage";
import DrawerContainer from "./DrawerContainer";
import '../styles/BasicLayoutStyle.css';
import {ScreenNames} from "../common/constants/ScreenNames";
import AddOrEditUserPage from "../pages/AddOrEditUserPage";

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
            </div>
        </div>
    )
}

export default BasicLayout;
