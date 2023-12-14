import { useEffect, useState } from 'react';
import UsersList from './users/usersList'
import SignalDisplay from './signals/signalDisplay'
import './adminPage.css'
import { ImUsers } from "react-icons/im";
import { RiBatteryShareLine } from "react-icons/ri";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import User from '../../../api/user';
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import userIconBlack from '../../../Images/6522516.png';
import PythonTest from './testPython/pythonTest';


const AdminPage = () => {

    const userApi = User();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("Users")
    const [UserName, setUsername] = useState("");
    const [logout, setLogout] = useState(false);

    const handleLogout = () => {
        setLogout(true);
    }

    const handleBacklogout = () => {
        setLogout(false);
    }

    const handleDefLogout = () => {
        setLogout(false);
        localStorage.removeItem('jwtToken');
        navigate('/');
    }

    const token = localStorage.getItem('jwtToken');

    const getUsername = async() => {
        try {
            const user = await userApi.GetUsername(token);

            let name = user.data.user.name.split('@')[0];
            if (name.includes('.')) {
                name = name.split('.')[0] + " " + name.split('.')[1]
            }

            setUsername(name);
        } catch (error) {
            //token expired or invalid navigate to Login
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    }

    getUsername()

    const SwitchPage = (SidebarItem) => {
        setActivePage(SidebarItem)
    }



    return (
        <>
            {logout && (<div className='Logout-Background'><div className='logout-Container'><div className='logout-Label'><div>Do you wish to logout?</div><div className='logout-Label-username'><div><img width={40} src={userIconBlack} alt="" /></div><div>{UserName}</div></div></div><div className='logout-button-Container'><button className='logout-button' onClick={handleDefLogout}>Logout</button><button className='logout-button' onClick={handleBacklogout}>Back</button></div></div></div>) }
            <div className='Sidebar'>
                <div className='Sidebar-User'>
                    <div>
                        <MdAccountCircle className='Sidebar-User-Icon'/> 
                    </div>
                    <div><span>{UserName}</span></div>
                </div>
                <div onClick={() => SwitchPage("Users")} className={activePage == "Users" ? "Sidebar-Link active" : "Sidebar-Link"}><ImUsers className='Sidebar-Icon'/><div>Users</div></div>
                <div onClick={() => SwitchPage("Battery Signals")} className={activePage == "Battery Signals" ? "Sidebar-Link active" : "Sidebar-Link"}><RiBatteryShareLine className='Sidebar-Icon'/><div>Battery Signals</div></div>
                <div onClick={() => SwitchPage("Test Python")} className={activePage == "Test Python" ? "Sidebar-Link active" : "Sidebar-Link"}><RiBatteryShareLine className='Sidebar-Icon'/><div>Test Python</div></div>
                <div className={activePage == "Get DeviceId" ? "Sidebar-Link active" : "Sidebar-Link"}><TbDeviceDesktopCog className='Sidebar-Icon'/><div>Get DeviceId</div></div>
                <div onClick={() => handleLogout()} className="Sidebar-Bottom Sidebar-Link"><RiLogoutBoxLine className='Sidebar-Icon'/><div>Logout</div></div>
            </div>

            {activePage == "Users" ? <div className='Sidebar-Adjustment'><UsersList></UsersList></div> : <div></div>}
            {activePage == "Battery Signals" ? <div className='Sidebar-Adjustment'><SignalDisplay></SignalDisplay></div> : <div></div>}
            {activePage == "Test Python" ? <div className='Sidebar-Adjustment'><PythonTest></PythonTest></div> : <div></div>}
        </>
    )
}

export default AdminPage;