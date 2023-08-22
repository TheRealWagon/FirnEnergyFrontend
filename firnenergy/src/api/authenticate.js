import { useEffect } from 'react';
import { usePython } from 'react-py'
import axios from 'axios';

const baseURL = "https://authentication.eniris.be/";

const Authenticate = () => {

    const login = async (username, password) => {    
        console.log("Login Attempt")
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://authentication.eniris.be/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    const logout = async (token) => {    
        console.log("Logout Attempt")
        let data = '';

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://authentication.eniris.be/auth/logout',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios.post(config.url, data, config);
            return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            // throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    const Accesstoken = async (token) => {    
        console.log("AccessToken Retrieve")
        let data = '';

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://authentication.eniris.be/auth/accesstoken',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        data : data
        };

        try {
            const response = await axios(config);
            return response.data; // Return the data after successful response
          } catch (error) {
            console.log(error);
            // throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
          }

    }

    const Devices = async (accessToken) => {    
        console.log("Devices Retrieve")
        let data = JSON.stringify([
            {
              
            }
          ]);
          
          const corsProxy = 'https://cors-anywhere.herokuapp.com/';

          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.eniris.be/v1/device?id=137206',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${accessToken}`,
            },
            data : data
          };
          
          try {
            const response = await axios.get(corsProxy + config.url, config);
            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    return {
        login,
        logout,
        Accesstoken,
        Devices,
    }


}

export default Authenticate;