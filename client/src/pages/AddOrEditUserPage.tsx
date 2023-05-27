import React, {ChangeEvent, useEffect, useState} from "react";
import '../styles/GlobalStyle.css'
import '../styles/AddOrEditUserPageStyle.css';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../common/models/user.interface";
import {toast} from "react-toastify";
import axios from "axios";


type AddOrEditUserPageProps = {}

const AddOrEditUserPage: React.FC<AddOrEditUserPageProps> = (props: AddOrEditUserPageProps) => {
    const tasksTableColumns = ['Title', 'Description', 'Priority'];
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState<string>();
    const [user, setUser] = useState<User>({} as User);
    const [roles, setRoles] = useState<{ id: number, name: string }[]>([]);
    const [selectedRole, setSelectedRole] = useState<number>(-1);

    const handleFormChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        param: string,
    ) => {
        setUser((prevState: User) => {
            return {
                ...prevState,
                [param]: event.target.value,
            };
        });
    };
    const getUser = async () => {
        if (!location.state || !location.state.userId) return;
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`/admin/getUsers.php?id=${location.state.userId}`, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                }
            })
            setUser(response.data.data.users[0]);
            setSelectedRole(response.data.data.users[0].roleId);
            console.log(response.data.data.users[0].roleId)
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.data?.error);
        }
    }

    const onClickSaveHandler = async () => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(user.birthday ? user.birthday : '')) {
            toast.error('Date invalid. Required format is YYYY-MM-DD');
            return;
        }
        try {
            const token = await localStorage.getItem('token');
            const config = {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }

            const dto = {
                ...user,
                roleId: selectedRole
            }

            if (location.state.mode === 'ADD') {
                await axios.post('/admin/createUser.php', dto, config);
            } else {
                await axios.post('/admin/updateUser.php', {
                    ...dto,
                    userId: location.state.userId
                }, config);
            }
            toast.success('Successfully saved!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    const getUserRoles = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/admin/allUserRole.php', {
                baseURL: process.env.REACT_APP_BASE_URL, headers: {
                    'Access-Token': token
                }
            })
            setRoles(response.data.data.roles);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }


    useEffect(() => {
        if (!location.state || !location.state.mode) return;
        setTitle(location.state.mode === 'EDIT' ? 'Edit User' : 'Add User');
        getUser();
        getUserRoles();
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
                            <input value={user.username ? user.username : ''} type={'text'}
                                   disabled={location.state.mode === 'EDIT'}
                                   placeholder={'pera123'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'username')}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Email</label>
                            <input value={user.email ? user.email : ''} type={'email'}
                                   disabled={location.state.mode === 'EDIT'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'email')}
                                   placeholder={'pera@example.com'}/>
                        </div>
                    </div>
                    {location.state.mode === "ADD" && <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Password</label>
                            <input value={user.password ? user.password : ''} type={'password'}
                                   placeholder={'********'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'password')}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Confirmed Password</label>
                            <input value={user.confirmedPassword ? user.confirmedPassword : ''} type={'password'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'confirmedPassword')}
                                   placeholder={'********'}/>
                        </div>
                    </div>}

                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>First name</label>
                            <input value={user.firstName ? user.firstName : ''} type={'text'} placeholder={'Pera'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'firstName')}
                            />
                        </div>
                        <div className={'form-field-container'}>
                            <label>Last name</label>
                            <input value={user.lastName ? user.lastName : ''} type={'text'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'lastName')}
                                   placeholder={'Peric'}/>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Date of birth</label>
                            <input value={user.birthday ? user.birthday : ''} type={'text'}
                                   placeholder={'1999-12-18'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'birthday')}
                            />
                        </div>
                        <div className={'form-field-container'}>
                            <label>Phone number</label>
                            <input value={user.phone ? user.phone : ''} type={'tel'}
                                   disabled={false}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'phone')}
                                   placeholder={'0611111111'}/>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Role</label>
                            <select
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedRole(parseInt(event.target.value))}
                                className={'role-select'}>
                                {roles.map(role => <option selected={user.roleId === role.id} key={role.id}
                                                           value={role.id}>{role.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button onClick={onClickSaveHandler} className={'save-button'}>Save</button>
                </div>


            </div>
        </div>
    </div>)
}
export default AddOrEditUserPage;
