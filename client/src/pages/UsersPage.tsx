import '../styles/GlobalStyle.css'
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "../common/models/user.interface";

const UsersPage = () => {

    const usersTableColumns = ['First name', 'Last name', 'Role', 'Phone number', 'Date of birth', 'Actions'];
    const navigate = useNavigate();


    const [users, setUsers] = useState<User[]>([])
    const editUserNavigationHandler = (userId: number) => {
        navigate('/user', {state: {mode: 'EDIT', userId}})
    }

    const getAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/admin/getUsers.php', {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            });
            setUsers(response.data.data.users);
        } catch (error: any) {
            const role = await localStorage.getItem('role');
            if (role?.toLowerCase() !== 'admin') {
                navigate('/tasks');
                return;
            }
            toast.error(error?.response?.data?.data?.error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (<div className={'card'}>
        <div className={'card-title-container'}>
            <h2>Users</h2>
            <button className={'card-button'} onClick={() => navigate('/user', {state: {mode: 'ADD'}})}>+ Add</button>
        </div>
        <Table columns={usersTableColumns} onClick={editUserNavigationHandler} users={users}
               hasActionButtons={true}/>
    </div>)
}
export default UsersPage;
