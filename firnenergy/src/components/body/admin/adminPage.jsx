import { useEffect } from 'react';
import UsersList from './users/usersList'


const AdminPage = () => {

useEffect(() => {
    console.log("this runs")
})
    
    return (
        <>
            <div><h1>Users</h1></div>
            <UsersList></UsersList>
        </>
    )
}

export default AdminPage;