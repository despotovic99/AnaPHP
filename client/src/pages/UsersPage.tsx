import '../styles/GlobalStyle.css'
import Table from "../components/Table";

const UsersPage = () => {
    const dummyUsers = [
        {
            id: 1,
            firstName: 'Test',
            lastName: 'Test',
            role: 'Admin',
            phoneNumber: '06123456',
            dateOfBirth: '10.03.2000'
        }, {
            id: 2,
            firstName: 'Test',
            lastName: 'Test',
            role: 'Admin',
            phoneNumber: '06123456',
            dateOfBirth: '10.03.2000'
        },
        {
            id: 3,
            firstName: 'Test',
            lastName: 'Test',
            role: 'Admin',
            phoneNumber: '06123456',
            dateOfBirth: '10.03.2000'
        },
        {
            id: 4,
            firstName: 'Test',
            lastName: 'Test',
            role: 'Admin',
            phoneNumber: '06123456',
            dateOfBirth: '10.03.2000'
        },
        {
            id: 5,
            firstName: 'Test',
            lastName: 'Test',
            role: 'Admin',
            phoneNumber: '06123456',
            dateOfBirth: '10.03.2000'
        },

    ]
    const usersTableColumns = ['First name', 'Last name', 'Role', 'Phone number', 'Date of birth', 'Actions'];

    return (<div className={'card'}>
        <div className={'card-title-container'}>
            <h2>Users</h2>
            <button className={'card-button'}>+ Add</button>
        </div>
        <Table columns={usersTableColumns} data={dummyUsers}/>
    </div>)
}
export default UsersPage;
