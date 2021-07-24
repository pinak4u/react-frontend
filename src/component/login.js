import React from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
    withCredentials:true
});

function Login() {
    const login = (email,password) =>{
        let userData = {email,password};
        axiosInstance.get('http://lapi.test/sanctum/csrf-cookie').then(response => {
            axiosInstance.post('http://lapi.test/api/login',userData)
                .then(response=>{
                    const token = response.data;
                    localStorage.setItem('token',token);
                })
                .catch(error=>console.log(error))
        });
    }
    const buttonHandler = (event) => {
        login('karianne.hamill@example.net','password')
    }


    const  fetchUser = (event) => {
        const token = localStorage.getItem('token');
        const header  = {
            headers:{
                authorization: `Bearer ${token}`
            }
        }    
        axiosInstance.get('http://lapi.test/api/user',header)
        .then(response => {
            console.log(response.data);
        }).catch(error=>{
            if(error.response.status == 401)
            {
                login('karianne.hamill@example.net','password');
            }
        });
    }

    const  fetchProducts = (event) => {
        const token = localStorage.getItem('token');
        const header  = {
            headers:{
                authorization: `Bearer ${token}`
            }
        }    
        axiosInstance.get('http://lapi.test/api/filter',header)
        .then(response => {
            // console.log(response.data);
            const data = response.data;
            data.forEach((singleProduct)=>{
               if(singleProduct.images){
                   const images = singleProduct.images;
                   console.log('====Start====');
                   images.forEach((singleImage)=>{
                       console.log(singleImage);
                   })
                   console.log('====End====');

               }
            })
        }).catch(error=>{
            console.log(error);
            if(error.response.status == 401)
            {
                login('karianne.hamill@example.net','password');
            }
        });
    }

    return (
        <div>
            <button onClick={(event)=>{buttonHandler(event)}}>Login User</button>
            <button onClick={(event)=>{fetchUser(event)}}>Fetch User</button>
            <button onClick={(event)=>{fetchProducts(event)}}>Fetch Products</button>
        </div>
         
         

    )
}

export default Login
