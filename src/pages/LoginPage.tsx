import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { apiRequest } from '../utils/utils';

const LoginPage = function(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const authStore = useAuthStore();

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            setErrorMessage('Fields must not be empty');
            return;
        };
        setLoading(true);
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

        const data = await apiRequest('/auth/login', payload);

        if(data?.userData){
            useAuthStore.setState({
                isLoggedIn: true,
                authUser: data.userData
            });
            setLoading(false);
            navigate("/");
        }else{
            setLoading(false);
            setErrorMessage(data.message);
        }
    };

    useEffect(()=>{
        if(authStore.isLoggedIn){
            navigate("/");
        }
    }, [authStore.isLoggedIn])

    return (
        <div className='form-page'>
            {
                loading===true? 
                <div className='loading-message'>
                    <h1>Loading.....</h1>
                    <p>Free web hosting....</p>
                    <p>May take a minute or two....</p>
                    <p>Please be patient.</p>
                    <p>Thank you.</p>
                </div>:
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
            }
        </div>
    )
}

export default LoginPage;