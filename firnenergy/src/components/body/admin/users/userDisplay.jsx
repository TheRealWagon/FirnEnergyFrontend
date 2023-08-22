import { useState } from 'react';
import './userDisplay.css';
import User from '../../../../api/user';



const UserDisplay = ({email, password, enirisEmail, deviceId, enirisPassword, RefreshUserListPage}) => {

    const [nothingFilledError, setNothingFilledError] = useState(false);
    const [Error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [passwordresetSuccess, setPasswordResetSuccess] = useState(false);
    const [passwordresetFailed, setPasswordResetFailed] = useState(false);

    const [newEnirisEmail, setNewEnirisEmail] = useState('');
    const [newDeviceId, setNewDeviceId] = useState('');
    const [newEnirisPassword, setNewEnirisPassword] = useState('');
    const [newDefaultPassword, setNewDefaultPassword] = useState('');

    const [EnirisPasswordNotHashed, setEnirisPasswordNotHashed] = useState('');

    const userApi = User();

    const HandleSubmit = async (event) => {
        event.preventDefault();

        setNothingFilledError(false);
        setSuccess(false);
        setError(false);
        setPasswordResetSuccess(false);
        setPasswordResetFailed(false);

        //check if admin > change fields that are not empty

        if (newEnirisEmail === "" && newDeviceId === "" && newEnirisPassword === "") {
            setNothingFilledError(true)
        } else {
            try {
                const token = localStorage.getItem('jwtToken');
                if (newEnirisEmail != "") {
                    //update enirisemial
                    const response = await userApi.changeEnirisEmail(token, email, newEnirisEmail);
                }
                if (newDeviceId != "") {
                    //update device id
                    const response = await userApi.changeDeviceId(token, email, newDeviceId);
                }
                if (newEnirisPassword != "") {
                    //update eniris pass
                    const response = await userApi.changeEnirisPassword(token, email, newEnirisPassword);
                    setEnirisPasswordNotHashed(newEnirisPassword);
                }
                setSuccess(true);
                RefreshUserListPage();
            } catch (error) {
                setError(true)
            }
        }

    }


    const HandlePasswordReset = async() => {
        const token = localStorage.getItem('jwtToken');
        const randompass = generatePassword(10);
        setNewDefaultPassword(randompass);

        setNothingFilledError(false);
        setSuccess(false);
        setError(false);
        setPasswordResetSuccess(false);
        setPasswordResetFailed(false);

        try {
            setNothingFilledError(false);
            setSuccess(false);
            setError(false);
            const response = await userApi.ResetPassword(token, email, randompass);
            setPasswordResetSuccess(true);
            setNothingFilledError(false);
            setSuccess(false);
            setError(false);
        } catch (error) {
            setPasswordResetFailed(true);
        }
        

    }


    function generatePassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let password = "";
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
      
        return password;
    }

    return (

        <div>
            <form className='UserDisplay-Container' onSubmit={HandleSubmit}>
                <div className='UserDisplay-Container-Column'>
                    <div className='UserDisplay-Container-Column-Item'>
                        <div className='UserDisplay-Container-Column-Item-Label'>User:</div>
                        <div className='UserDisplay-Container-Column-Item-Value'>{email}</div>
                    </div>
                    <div className='UserDisplay-Container-Column-Item'>
                        <div className='UserDisplay-Container-Column-Item-Label'>Password:</div>
                        <div className='UserDisplay-Container-Column-Items'>
                            <div className='UserDisplay-Container-Column-Item-ScrollValue'>
                                <div>{newDefaultPassword}</div>
                            </div>
                            <div>
                                <button onClick={HandlePasswordReset} type='' className='UserDisplay-Container-Column-Item-ResetPassword'>Reset Password</button>
                            </div>
                        </div>
                    </div>
                    <div className='UserDisplay-Container-Column-Item'>
                        <div className='UserDisplay-Container-Column-Item-Label'>Eniris email:</div>
                        <div className='UserDisplay-Container-Column-Items'>
                            <div className='UserDisplay-Container-Column-Item-ScrollValue'>
                                <div>{enirisEmail}</div>
                            </div>
                            <div className='UserDisplay-Container-Column-Input-Field-Container'>
                                <input className='UserDisplay-Input-Field' name='newenirisemail' type="text" onChange={(e) => setNewEnirisEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='UserDisplay-Container-Column'>
                <div className='UserDisplay-Container-Column-Item'>
                        <div className='UserDisplay-Container-Column-Item-Label'>DeviceId:</div>
                        <div className='UserDisplay-Container-Column-Items'>
                            <div className='UserDisplay-Container-Column-Item-ScrollValue'>
                                <div>{deviceId}</div>
                            </div>
                            <div className='UserDisplay-Container-Column-Input-Field-Container'>
                                <input className='UserDisplay-Input-Field' name='newdeviceid' type="text" onChange={(e) => setNewDeviceId(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='UserDisplay-Container-Column-Item'>
                        <div className='UserDisplay-Container-Column-Item-Label'>Eniris pass:</div>
                        <div className='UserDisplay-Container-Column-Items'>
                            <div className='UserDisplay-Container-Column-Item-ScrollValue'>
                                <div>{EnirisPasswordNotHashed}</div>
                            </div>
                            <div className='UserDisplay-Container-Column-Input-Field-Container'>
                                <input className='UserDisplay-Input-Field' name='newenirispassword' type="text" onChange={(e) => setNewEnirisPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='UserDisplay-Container-Column-Item'>
                        <div className='UserDisplay-Container-Column-Item-button-container'><button type="submit" className='UserDisplay-Container-Column-Item-button'>Submit</button></div>
                        
                    </div>
                    {passwordresetFailed ? <div className='UserDisplay-errorText'>Password reset failed!</div> : <></>}
                    {passwordresetSuccess ? <div className='UserDisplay-successText'>Password reset!</div> : <></>}
                    {Error ? <div className='UserDisplay-errorText'>Error see log!</div> : <></>}
                    {nothingFilledError ? <div className='UserDisplay-errorText'>Nothing filled in!</div> : <></>} 
                    {success ? <div className='UserDisplay-successText'>Successfully changed!</div> : <></>}
                </div>
            </form>
        </div>

    )


}

export default UserDisplay;