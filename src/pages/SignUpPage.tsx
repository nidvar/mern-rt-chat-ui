import { useState } from 'react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SignUpPage = function(){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            console.log('email / password is empty');
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

        const res = await fetch(baseURL + '/auth/signup', payload);
        const data = await res.json();
        console.log(data);
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
                        onChange={function(e){setUsername(e.target.value)}}
                    />

                    <br />
                    <br />

                    <input 
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange={function(e){setEmail(e.target.value)}}
                    />

                    <br />
                    <br />

                    <input 
                        type="password"
                        placeholder='password'
                        onChange={function(e){setPassword(e.target.value)}}
                    />

                    <br />
                    <br />

                    <button type="submit">REGISTER</button>
                </form>
            </div>
        </>
    )
};

export default SignUpPage;