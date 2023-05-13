import '../styles/GlobalStyle.css'
import Table from "../components/Table";

const UsersPage = () => {
    const dummyUsers = [
        {
            id: 1,
            firstName: 'Nemanja',
            lastName: 'Mutavdzic',
            role: 'Admin',
            phoneNumber: '0616055890',
            dateOfBirth: '18.03.1999'
        }, {
            id: 2,
            firstName: 'Nemanja',
            lastName: 'Mutavdzic',
            role: 'Admin',
            phoneNumber: '0616055890',
            dateOfBirth: '18.03.1999'
        },
        {
            id: 3,
            firstName: 'Nemanja',
            lastName: 'Mutavdzic',
            role: 'Admin',
            phoneNumber: '0616055890',
            dateOfBirth: '18.03.1999'
        },
        {
            id: 4,
            firstName: 'Nemanja',
            lastName: 'Mutavdzic',
            role: 'Admin',
            phoneNumber: '0616055890',
            dateOfBirth: '18.03.1999'
        },
        {
            id: 5,
            firstName: 'Nemanja',
            lastName: 'Mutavdzic',
            role: 'Admin',
            phoneNumber: '0616055890',
            dateOfBirth: '18.03.1999'
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
