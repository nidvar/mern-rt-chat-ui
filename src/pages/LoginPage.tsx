import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = function(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const authStore = useAuthStore();

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

                useAuthStore.setState({
                    isLoggedIn: true,
                    authUser: data.userData
                });

                navigate("/");
            }else{
                const data = await res.json();
                setErrorMessage(data.message);
            }
        }catch{
            setErrorMessage('There has been an error. Please try again later.');
        }
    };

    useEffect(()=>{
        if(authStore.isLoggedIn){
            navigate("/");
        }
    }, [authStore.isLoggedIn])

    return (
        <div className='form-page'>
            <form onSubmit={handleSubmit} className='my-form'>
                <h1>Login</h1>
                <input 
                    type="email"
                    placeholder='email'
                    value={email}
                    onChange={function(e){setEmail(e.target.value); setErrorMessage('')}}
                />
                <input 
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={function(e){setPassword(e.target.value); setErrorMessage('')}}
                />
                <button type="submit">LOGIN</button>
                <p><Link to='/signup' className='link'>REGISTER</Link></p>
                <p className='error'>{errorMessage}</p>
            </form>
        </div>
    )
}

export default LoginPage;