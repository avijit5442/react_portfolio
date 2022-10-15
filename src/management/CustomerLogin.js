import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';



const CustomerLogin = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [err, setErr] = useState('');



    const onChangeUser = e => {
setUser({
    username:e.target.value,
    password:user.password
})
    }

    const onChangePwd = e => {
setUser({
    username:user.username,
    password:e.target.value
})
    }

    const notify = (msg) => {
        if(msg === 'Login Successful') {
            toast.success(msg, {
                position: 'top-right', autoClose: 3550, hideProgressBar: true, closeOnClick: false, 
                pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
            });
        }
        else {
            toast.error(msg, {
                position: 'top-right', autoClose: 3550, hideProgressBar: true, closeOnClick: false, 
                pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
            });
        }
    }

    const loginSubmit = async e =>{
    
        e.preventDefault()
        try {
            const res = await axios.post('https://ras-api-server.herokuapp.com/api/auth/login',{
                username: user.username,
                password: user.password
            });
            if(res.data.isAdmin) {
                setErr("Admin Login Has a Separate Page");
                notify("Admin Login Has a Separate Page")
                return;
            }
            setUser({username: '', password: ''});
            localStorage.setItem('tokenStore', res.data.accessToken);
            notify('Login Successful');
            
        } catch (err) {
            console.log(err);
            setErr(err.response.data);
            notify(err.response.data);
        }
    }
    return(
        <div className='admin-login-page-container'>
            <h1>Customer Login</h1><br />

            <h3>Welcome Back!</h3>
            <h4>Please enter your details to sign in to your account</h4>

            <br /><br />

            <form onSubmit={loginSubmit} method="post" className = "log-form">
                <div className="group log-input">
                    <input type="text" id = "username" name = "username" placeholder = "Username" required value={user.username} onChange={onChangeUser} />
                </div>

                <br />

                <div className="group log-input">
                    <input type="password" id = "password" name = "password"  placeholder = "Password" required value={user.password} autoComplete="true" onChange={onChangePwd} />
                </div>

                <br />

                {
                    // err ? <><p className='log-form-err'>{err}</p><br /></> : <br />
                }
                
                <div className="container-log-btn">
                    <button type="submit" name = "btn_submit" className="log-form-btn">
                    <span>Login</span>
                    </button>
                </div>
            </form>
            <br />
       
        </div>
    );
}

export default CustomerLogin;