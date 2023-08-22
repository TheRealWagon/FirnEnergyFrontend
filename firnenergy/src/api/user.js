import axios from "axios";

const baseURL = "https://firnenergybackend.onrender.com/api/users/";

const User = () => {

    const login = async (email, password, remember) => {

        let data = JSON.stringify({
            "email": email,
            "password": password,
            "remember": remember,
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    const GetUsername = async (token) => {

        let data = JSON.stringify({
            
        });

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/info`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.get(config.url, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    const GetAccessToken = async (token) => {    

        let data = JSON.stringify({
            
        });

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/AccessToken`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.get(config.url, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    const register = async (user) => {

        let data = JSON.stringify({
            "email": user.email,
            "password": user.password,
            "phonenumber": user.phonenumber,
            "city": user.city,
            "street": user.street,
            "housenumber": user.housenumber,
            "postcode": user.postcode,
            "role": "USER",
            "deviceid": "",
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/add`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    const GetUserData = async (token) => {    

        let data = JSON.stringify({
            
        });

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/users`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.get(config.url, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    const changeEnirisEmail = async (token, email, enirisEmail) => {

        let data = JSON.stringify({
            email: email,
            enirisEmail, enirisEmail,
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/change/enirisEmail`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    const changeDeviceId = async (token, email, deviceid) => {

        let data = JSON.stringify({
            email: email,
            deviceid, deviceid,
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/change/deviceid`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    

    const changeEnirisPassword = async (token, email, enirisPassword) => {

        let data = JSON.stringify({
            email: email,
            enirisPassword, enirisPassword,
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/change/enirispassword`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    const ResetPassword = async (token, email, password) => {

        let data = JSON.stringify({
            email: email,
            password, password,
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://firnenergybackend.onrender.com/api/users/ResetPassword`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }


    return {
        login,
        GetUsername,
        GetAccessToken,
        register,
        GetUserData,
        changeEnirisEmail,
        changeDeviceId,
        changeEnirisPassword,
        ResetPassword,
    }


}

export default User;