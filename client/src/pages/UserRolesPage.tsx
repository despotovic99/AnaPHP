import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useEffect, useState} from "react";
import {UserRole} from "../common/models/user.interface";

const UserRolesPage = () => {
    const navigate = useNavigate();
    const columnNames = ['ID', 'Role name', 'Actions'];

    const [roles, setRoles] = useState<UserRole[]>([]);
    const editUserRoleNavigationHandler = (roleId: number) => {
        navigate('/user-role', {state: {mode: 'EDIT', roleId}})
    }

    const getAllUserRoles = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/admin/allUserRole.php', {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            });
            setRoles(response.data.data.roles);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error)
        }
    }

    useEffect(() => {
        getAllUserRoles();
    }, []);

    return (<div className={'card'}>
        <div className={'card-title-container'}>
            <h2>User Roles</h2>
            <button className={'card-button'} onClick={() => navigate('/user-role', {state: {mode: 'ADD'}})}>+ Add
            </button>
        </div>
        <Table columns={columnNames} onClick={editUserRoleNavigationHandler} userRoles={roles}
               hasActionButtons={true}/>
    </div>)
}
export default UserRolesPage;
