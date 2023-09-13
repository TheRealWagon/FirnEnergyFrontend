import { useEffect } from 'react';
import UsersList from './users/usersList'


const AdminPage = () => {

useEffect(() => {
    console.log("this runs")
})
    
    return (
        <>
            <UsersList></UsersList>
        </>
    )
}

export default AdminPage;