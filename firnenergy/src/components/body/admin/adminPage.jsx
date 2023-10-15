import { useEffect, useState } from 'react';
import UsersList from './users/usersList'
import SignalDisplay from './signals/signalDisplay'

const AdminPage = () => {
    
    const [Page, setPage] = useState(<UsersList></UsersList>)


    const SwitchToUsers = () => {
        setPage(<UsersList></UsersList>)
    }

    const SwitchToSignals = () => {
        setPage(<SignalDisplay></SignalDisplay>)
    }

    return (
        <>
            <button onClick={SwitchToUsers}>Users</button>
            <button onClick={SwitchToSignals}>Signals</button>

            {Page}
        </>
    )
}

export default AdminPage;