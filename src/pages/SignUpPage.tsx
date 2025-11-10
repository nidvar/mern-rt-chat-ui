import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SignUpPage = function(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(email.trim() === '' || password.trim() === '' || username.trim() === ''){
            setErrorMessage('Fields cannot be empty');
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
                username: username,
                password: password
            })
        };
        try{
            const res = await fetch(baseURL + '/auth/signup', payload);
            const data = await res.json();
            if(res.ok){
                console.log(data.message);
                navigate('/complete');
            }else{
                setErrorMessage(data.message);
            }
        }catch{
            setErrorMessage('Error has occured. Please try again later');
        }
    };

    return(
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <input 
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange={function(e){setUsername(e.target.value); setErrorMessage('')}}
                    />
                    <br />
                    <br />
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
                    <button type="submit">REGISTER</button>
                </form>
                <p>{errorMessage}</p>
            </div>
        </>
    )
};

export default SignUpPage;