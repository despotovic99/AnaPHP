import React from "react";
import DashboardPage from "../pages/DashboardPage";
import DrawerContainer from "./DrawerContainer";
import '../styles/BasicLayoutStyle.css';

type BasicLayoutProps = {
    screenName: string
}
const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
    return (
        <div className={'layout-container'}>
            <DrawerContainer/>
            <div className={'layout-card'}>
                <div className={'layout-top-stripe'}/>
                {props.screenName === 'HOME_SCREEN' && <DashboardPage/>}
            </div>
        </div>
    )
}

export default BasicLayout;
