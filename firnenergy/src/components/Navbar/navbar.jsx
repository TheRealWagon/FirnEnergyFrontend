import './navbar.css'
import Logo from '../../Images/firnenergyLogo.png'
import globeIcon from '../../Images/globe_icon.png'
import userIcon from '../../Images/user_icon.png'
import infoIcon from "../../Images/info_icon.png"
import Authenticate from "../../api/authenticate"
import { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import User from '../../api/user';
import { useNavigate } from 'react-router-dom';
import userIconBlack from '../../Images/6522516.png';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [logout, setLogout] = useState(false);
    const userApi = User();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    // useEffect(async () => {
        
    //     // const user = await userApi.GetUsername();
    //     // console.log(user)
    //     // setUsername(user.data)
    // }, []);

    const token = localStorage.getItem('jwtToken');

    const getUsername = async() => {
        try {
            const user = await userApi.GetUsername(token);
            setUsername(user.data.user.name.split('@')[0]);
        } catch (error) {
            //token expired or invalid navigate to Login
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    }
   
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


    useEffect(() => {
        getUsername();
    }, []);
    
    
    return (
        <>
            {logout && (<div className='Logout-Background'><div className='logout-Container'><div className='logout-Label'><div>Do you wish to logout?</div><div className='logout-Label-username'><div><img width={40} src={userIconBlack} alt="" /></div><div>{username}</div></div></div><div className='logout-button-Container'><button className='logout-button' onClick={handleDefLogout}>Logout</button><button className='logout-button' onClick={handleBacklogout}>Back</button></div></div></div>) }
            <div className='NavbarContainer'>
                <div className='LogoContainer'>
                    <div className='Logo'>
                        <img src={Logo} alt='logo_icon' />
                    </div>
                </div>
                <div className='PageContainer'>
                    <div className='Page selected'>Home</div>
                    <div className='Page'>About us</div>
                    <div className='Page'>Feature</div>
                    <div className='Page'>Contact</div>
                </div>
                <div className='InfoContainer'>
                    <div><img src={globeIcon} alt="globe_Icon" />english</div>
                    <div className='NavbarAccount'><button className='AccountLink' onClick={handleLogout}><img style={{paddingRight: "10px"}} src={userIcon} alt="" />{username}</button></div>
                    <div className='PageDivider'></div>
                    {/* <div className='Navbar_Info'><img src={infoIcon} alt="" /></div> */}
                    {/* <div><input type='checkbox' checked={darkMode} onChange={toggleDarkMode}/><span className='slider round'></span></div> */}
                </div>
            </div>
            <div>
                {/* <button onClick={Login}>Login</button> */}
            </div>
        </>

    )
}

export default Navbar;