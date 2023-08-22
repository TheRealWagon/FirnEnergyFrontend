import Authenticate from "../../../api/authenticate"
import { useState } from 'react'

const Auth = () => {
    const [token, setToken] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAccessed, setIsAccessed] = useState(false);
    const [response, setResponse] = useState('');
    const [devices, setDevices] = useState('');
    const [foundDevices, setFoundDevices] = useState(false);

    const authApi = Authenticate();

    const HandleLoginEvent = async () => {

        setToken(await authApi.login("frank@avalasia.com", "8695e05d865d6196"));
        setIsLoggedIn(true);
    }

    const HandleLogoutEvent = async () => {

        setResponse(await authApi.logout(token));
        if (response === "") {
            setIsLoggedIn(false);
            setIsAccessed(false);
            setAccessToken('');
            setToken('');
        }
    }

    const HandleAccessToken = async () => {

        setAccessToken(await authApi.Accesstoken(token));
        setIsAccessed(true);
    }

    const handleGetDevices = async () => {

        setDevices(await authApi.Devices(accessToken));
        setFoundDevices(true);
        console.log(devices)
    }

    
    return (
        <div>
            <button onClick={HandleLoginEvent}>Login</button>
            {isLoggedIn ? <div>You are logged in</div> : <div>You are logged off</div>}
            {isLoggedIn ? <button onClick={HandleAccessToken}>AccessToken</button> : <></>}
            {isAccessed ? <div>You are accessed</div> : <div></div>}
            <button onClick={HandleLogoutEvent}>logout</button>
            <br />
            <button className='Devices' onClick={handleGetDevices}>Devices</button>
            {/* {foundDevices ? <div>{devices}</div> : <></>} */}
        </div>
    )
}

export default Auth;