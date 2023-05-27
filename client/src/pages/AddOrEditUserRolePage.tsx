import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {UserRole} from "../common/models/user.interface";
import {toast} from "react-toastify";
import axios from "axios";

const AddOrEditUserRolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>();
    const [role, setRole] = useState<UserRole>({} as UserRole);
    const [roleName, setRoleName] = useState<string>();
    const onClickSaveHandler = async () => {
        try {
            const token = await localStorage.getItem('token');
            const config = {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
            if (location.state.mode === 'ADD') {
                await axios.post('/admin/createUserRole.php', {name: roleName}, config);
            } else {
                await axios.post('/admin/createUserRole.php', {id: location.state.roleId, name: roleName}, config);
            }
            toast.success('Successfully saved!');
            navigate('/user-roles')
        } catch (error: any) {
            toast.error(error?.response?.data?.data.error);
        }
    }

    const getUserRole = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`/admin/getUserRole.php?id=${id}`, {
                baseURL: process.env.REACT_APP_BASE_URL, headers: {
                    'Access-Token': token
                }
            });
            setRoleName(response.data.data.role.name);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    useEffect(() => {
        if (!location.state || !location.state.mode) return;
        if (location.state.roleId) {
            getUserRole(location.state.roleId);
        }
        setTitle(location.state.mode === 'EDIT' ? 'Edit User Role' : 'Add User Role');
    }, [])

    return <div className={'card'}>
        <div className={'detail-card-container'}>
            <div className={'card-navigation-container'}>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate('/task-groups')} className={'icon'}/>
                {title && <h2>{title}</h2>}
            </div>
            <div className={'card-detail-page'}>
                <div className={'form-container'}>
                    <div className={'form-field-container'}>
                        <label>Name</label>
                        <input className={'input-field'} type={'text'} value={roleName}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setRoleName(event.target.value)}/>
                    </div>
                    <button className={'save-button'} onClick={onClickSaveHandler}>Save</button>
                </div>
            </div>
        </div>
    </div>
}
export default AddOrEditUserRolePage
