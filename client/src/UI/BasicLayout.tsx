import React from "react";
import DashboardPage from "../pages/DashboardPage";
import DrawerContainer from "./DrawerContainer";

type BasicLayoutProps = {
    screenName: string
}
const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
    return (
        <div style={{display: 'flex'}}>
            <DrawerContainer/>
            <div style={{
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{height: '4vw', background: '#2148C0'}}>

                </div>
                {props.screenName === 'HOME_SCREEN' && <DashboardPage/>}
            </div>
        </div>
    )
}

export default BasicLayout;
