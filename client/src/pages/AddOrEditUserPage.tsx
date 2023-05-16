import React, {useEffect, useState} from "react";
import '../styles/GlobalStyle.css'
import '../styles/AddOrEditUserPageStyle.css';
import Table from "../components/Table";
import {dummyTasksForUser} from "../common/dummy-data/dummy-data";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../common/models/user.interface";


type AddOrEditUserPageProps = {}

const AddOrEditUserPage: React.FC<AddOrEditUserPageProps> = (props: AddOrEditUserPageProps) => {
    const tasksTableColumns = ['Title', 'Description', 'Priority'];
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState<string>();
    const [user, setUser] = useState<User>();
    const [mode, setMode] = useState('');

    const getUser = async () => {
        if (!location.state || location.state.userId) return;
        //TODO call api, setUser, and set data into input fields
    }


    useEffect(() => {
        if (!location.state || !location.state.mode) return;
        setTitle(location.state.mode === 'EDIT' ? 'Edit User' : 'Add User');
        setMode(location.state.mode);
        getUser();
    }, [])

    return (<div className={'card'}>
        <div className={'detail-card-container'}>
            <div className={'card-navigation-container'}>
                <FontAwesomeIcon onClick={() => navigate('/')} className={'icon'} icon={faChevronLeft}/>
                {title && <h2>{title}</h2>}
            </div>
            <div className={'card-detail-page'}>
                <div className={'form-container'}>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Username</label>
                            <input type={'text'} disabled={true} placeholder={'pera123'}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Email</label>
                            <input type={'email'} disabled={true} placeholder={'pera123'}/>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>First name</label>
                            <input type={'text'} placeholder={'pera123'}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Last name</label>
                            <input type={'text'} placeholder={'pera123'}/>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Date of birth</label>
                            <input type={'date'} placeholder={'pera123'}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Phone number</label>
                            <input type={'tel'} placeholder={'pera123'}/>
                        </div>
                    </div>
                    {mode && mode === 'EDIT' && <Table onClick={() => {
                    }} columns={tasksTableColumns} tasks={dummyTasksForUser}/>}
                    <button className={'save-button'}>Save</button>
                </div>


            </div>
        </div>
    </div>)
}
export default AddOrEditUserPage;
