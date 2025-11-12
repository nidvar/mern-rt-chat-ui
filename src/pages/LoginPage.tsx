import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/useAuthStore';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = function(){

    const authStore = useAuthStore();

    // const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            setErrorMessage('Fields must not be empty');
            return;
        };

        const payload = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include' as RequestCredentials,
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        try{
            const res = await fetch(baseURL + '/auth/login', payload);
            if(res.ok){
                const data = await res.json();
                console.log(data);
                authStore.login();
            }else{
                const data = await res.json();
                setErrorMessage(data.message);
            }
        }catch{
            setErrorMessage('There has been an error. Please try again later.');
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <input 
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange={function(e){setEmail(e.target.value); setErrorMessage('')}}
                    />

                    <br />
                    <br />

                    <input 
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={function(e){setPassword(e.target.value); setErrorMessage('')}}
                    />

                    <br />
                    <br />

                    <button type="submit">LOGIN</button>
                </form>
                <p>{errorMessage}</p>
            </div>
        </>
    )
}

export default LoginPage;