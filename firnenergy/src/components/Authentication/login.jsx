import { useEffect, useState } from 'react';
import './login.css'
import {useNavigate} from "react-router-dom";
import User from '../../api/user';
import SlantedImage from '../../Images/LightmodeSlanted.png'
import Logo from '../../Images/firn-embleem-brown.png';
import SlantedImageBlack from '../../Images/DarkmodeSlanted.png'

const Login = () => {

    const navigate = useNavigate();
    const userApi = User();
    const [errorMessages, setErrorMessages] = useState({})
    const [Succesfull, setSuccesfull] = useState(false);
    const [Failed, setFailed] = useState(false);
    const [Login, setLogin] = useState(true);
    const [userExists, setUserExists] = useState(false);

    const renderErrorMessage = (name) => name === errorMessages.name && (<div className='error'>{errorMessages.message}</div>);

    const KeepLoggedIn = async() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            console.log("this runs")
            const user = await userApi.GetUsername(token);

            if (user.data.user.role == "USER") {
                navigate('/HomePage');
            } else if (user.data.user.role == "ADMIN") {
                navigate('/AdminPage');
            }
        }
    }

    useEffect(() => {
        KeepLoggedIn();
    })

    const handleLogin = async (event) => {
        event.preventDefault();
        //check if user exisits

        setFailed(false)
        setSuccesfull(false)

        var { email, pass, remember } = document.forms[0];

        const response = await userApi.login(email.value, pass.value, remember.checked);
        
        if (response.status === 204) {
            setFailed(true);
            
        } else {
            setSuccesfull(true);
            localStorage.setItem('jwtToken', response.data.token);

            if (response.data.role == 'USER') {
                navigate('/HomePage');
            } else if (response.data.role == 'ADMIN') {
                //navigate to admin view
                navigate('/AdminPage');
            }
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        //check if user exisits

        setFailed(false)
        setSuccesfull(false)

        var { email, pass, street, housenumber, postcode, city, phonenumber} = document.forms[0];

        const user = {
            "email": email.value,
            "password": pass.value,
            "phonenumber": phonenumber.value,
            "city": city.value,
            "street": street.value,
            "housenumber": housenumber.value,
            "postcode": postcode.value,
            "role": "USER",
            "deviceid": "",
        }

        try {
            setUserExists(false)
            const response = await userApi.register(user);
            setSuccesfull(true)
        } catch (error) {
            setUserExists(true)
        }

       
        // if (response.status === 204) {
        //     setFailed(true);
            
        // } else {
        //     setSuccesfull(true);
        //     localStorage.setItem('jwtToken', response.data.token);

        //     if (response.data.role == 'USER') {
        //         navigate('/HomePage');
        //     } else {
        //         //navigate to admin view
        //         console.log(response)
        //     }

        // }

    };

    const HandleSwitch = () => {
        setLogin(!Login);
    }

    const handleBackClick= () => {
        navigate('/');
    }

    return (
        
        <div className="container">
            <div className="image-org-container">
                {/* <img className='LoginImage' src={SlantedImage} alt="Desktop Website" />  */}
                <div className="image-container">
                    <img className="image front-image" src={SlantedImageBlack} alt="Front Image" />
                    <img className="image back-image" src={SlantedImage} alt="Back Image" />
                </div>
            </div>
            <div className="login-container">
                <div className='GoBackButton-Container'>
                    <button onClick={handleBackClick} className='GoBackButton'>Go back</button>
                </div>
                <img width={150} src={Logo} alt="" />
                <h1 className='Login-Header'>{Login ? "Login" : "Register"}</h1>
                {Login ? 

                    <form className='LoginForm' onSubmit={handleLogin}>
                        <div className="input-group">
                            <label className='input-Label'>Email </label>
                            <input className='input-Field' type="text" name="email" required />
                            {renderErrorMessage("email")}
                        </div>
                        <div className="input-group">
                            <label className='input-Label'>Password </label>
                            <input className='input-Field' type="password" name="pass" required />
                            {renderErrorMessage("pass")}
                        </div>
                        <div className='login-Details'>
                            <div>
                                <input type="checkbox" id="remember" name="remember"/>
                                <label htmlFor="remember" className='input-Checkbox-Label'>Remember me</label>
                            </div>
                            <div className='login-switch-button-container'>
                                <button onClick={HandleSwitch} className='login-switch-button'>Register</button>
                            </div>
                        </div>
                        <button className='Login-form-button' type="submit">Login</button>
                        {Succesfull ? <div className='LoginSuccesfull'>Loggin Succesfull!</div> : <></>}
                        {Failed ? <div className='LoginFailed'>Loggin Failed!</div> : <></>}
                    </form>

                : 
                    <form className='LoginForm' onSubmit={handleRegister}>
                        <div className='input-group-one'>
                            <div className="input-group-register">
                                <label className='input-Label'>Email </label>
                                <input className='input-Field' type="text" name="email" required />
                                {renderErrorMessage("email")}
                            </div>
                            <div className="input-group-register">
                                <label className='input-Label'>Password </label>
                                <input className='input-Field' type="password" name="pass" required />
                                {renderErrorMessage("pass")}
                            </div>
                        </div>
                        <div className='input-group-one'>
                            <div className="input-group-register input-group-street">
                                <label className='input-Label'>Street </label>
                                <input className='input-Field' type="text" name="street" required />
                            </div>
                            <div className="input-group-register input-group-housenumber">
                                <label className='input-Label'>House number </label>
                                <input className='input-Field' name="housenumber" required />
                                {renderErrorMessage("pass")}
                            </div>
                        </div>
                        <div className='input-group-one'>
                            <div className="input-group-register">
                                <label className='input-Label'>Postcode </label>
                                <input className='input-Field' type="text" name="postcode" required />
                            </div>
                            <div className="input-group-register">
                                <label className='input-Label'>City </label>
                                <input className='input-Field' name="city" required />
                            </div>
                        </div>
                        <div className='input-group-one'>
                            <div className="input-group-register">
                                <label className='input-Label'>Phone number </label>
                                <input className='input-Field' type="text" name="phonenumber" required />
                            </div>
                            <button className='Login-form-button' type="submit">Register</button>
                        </div>
                        <div className='login-Details'>
                            {/* <div>
                                <input type="checkbox" id="remember" name="remember"/>
                                <label htmlFor="remember" className='input-Checkbox-Label'>Remember me</label>
                            </div> */}
                            <div className='login-switch-button-container'>
                                <button onClick={HandleSwitch} className='login-switch-button'>Allready have an account?</button>
                            </div>
                        </div>
                        {Succesfull ? <div className='LoginSuccesfull'>{Login ? "Loggin Succesfull!" : "Registration Succesfull!"} </div> : <></>}
                        {Failed ? <div className='LoginFailed'>Loggin Failed!</div> : <></>}
                        {userExists ? <div className='LoginFailed'>User allready exists!</div> : <></>}
                    </form>
                
                
                }
                
                
            </div>
        </div>
        
    );

}

export default Login;