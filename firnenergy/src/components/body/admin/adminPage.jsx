import { useEffect, useState } from 'react';
import UsersList from './users/usersList'
import SignalDisplay from './signals/signalDisplay'
import './adminPage.css'
import { ImUsers } from "react-icons/im";
import { RiBatteryShareLine } from "react-icons/ri";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";


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
            {/* <button onClick={SwitchToUsers}>Users</button>
            <button onClick={SwitchToSignals}>Signals</button>

            {Page} */}

            <div className='Sidebar'>
                <div className='Sidebar-User'>
                    <div>
                        <MdAccountCircle className='Sidebar-User-Icon'/> 
                    </div>
                    <div>Username</div>
                </div>
                <div className='Sidebar-Link active'><ImUsers className='Sidebar-Icon'/><div>Users</div></div>
                <div className='Sidebar-Link'><RiBatteryShareLine className='Sidebar-Icon'/><div>Battery Signals</div></div>
                <div className='Sidebar-Link'><TbDeviceDesktopCog className='Sidebar-Icon'/><div>Get DeviceId</div></div>
            </div>

        </>
    )
}

export default AdminPage;