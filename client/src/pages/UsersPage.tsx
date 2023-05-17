import '../styles/GlobalStyle.css'
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {dummyUsers} from "../common/dummy-data/dummy-data";

const UsersPage = () => {

    const usersTableColumns = ['First name', 'Last name', 'Role', 'Phone number', 'Date of birth', 'Actions'];
    const navigate = useNavigate();

    const editUserNavigationHandler = (userId: number) => {
        navigate('/user', {state: {mode: 'EDIT', userId}})
    }

    return (<div className={'card'}>
        <div className={'card-title-container'}>
            <h2>Users</h2>
            <button className={'card-button'} onClick={() => navigate('/user', {state: {mode: 'ADD'}})}>+ Add</button>
        </div>
        <Table columns={usersTableColumns} onClick={editUserNavigationHandler} users={dummyUsers}
               hasActionButtons={true}/>
    </div>)
}
export default UsersPage;
