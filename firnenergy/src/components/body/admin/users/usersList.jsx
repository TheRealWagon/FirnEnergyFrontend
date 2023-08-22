import { useEffect, useState } from "react";
import User from '../../../../api/user';
import { useNavigate } from 'react-router-dom';
import UserDisplay from './userDisplay';
import './usersList.css'

import Authenticate from '../../../../api/authenticate'

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [reloadUserList, setReloadUserList] = useState(false);

    const userApi = User();
    const navigate = useNavigate();
    
    useEffect(() => {

        setReloadUserList(false)

        const ConfirmUserRole = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                const user = await userApi.GetUsername(token);

                if (user.data.user.role != 'ADMIN') {
                    throw Error;
                }

                //get the users
                const users = await userApi.GetUserData(token);
                setUsers(users.data);

            } catch (error) {
                //token expired or invalid navigate to Login
                localStorage.removeItem('jwtToken');
                navigate('/');
            }
        }
        ConfirmUserRole();
        
    }, [reloadUserList]);

    const RefreshUserListPage = () => {
        setReloadUserList(true);
    }

    // const [data, setData] = useState([]);
    // const AuthApi = Authenticate();

    // useEffect(() => {
        
    //     const retrievedata = async() => {
    //         const JwtToken = localStorage.getItem('jwtToken');
    //         const AccessToken = await userApi.GetAccessToken(JwtToken);
    //         console.log(AccessToken)
    //         const dete = await AuthApi.Devices(AccessToken);
    //         setData(dete);
    //     }
    //     retrievedata();

    // }, [])

    return (
        <div className="UserList-Container">
            {users.map((user, index) => (
                <div key={index} className="UserSet">
                <UserDisplay
                    email={user.email}
                    password={user.password}
                    deviceId={user.deviceid}
                    enirisEmail={user.enirisEmail}
                    enirisPassword={user.enirisPassword}
                    RefreshUserListPage={RefreshUserListPage}
                />
                </div>
            ))}
        </div>
        // <div>
        //     {data}
        // </div>
    )

}

export default UsersList;