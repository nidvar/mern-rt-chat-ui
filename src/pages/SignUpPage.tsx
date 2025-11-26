import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuthStore } from '../store/useAuthStore';
import { apiRequest } from '../utils/utils';

const SignUpPage = function(){

    const navigate = useNavigate();
    const authStore = useAuthStore();

    const fileInputRef = useRef(null);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [image, setImage] = useState<string | null>(null);

    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const handleImageUpload = function(e: React.ChangeEvent<HTMLInputElement>){
        setErrorMessage('');
        if(e.target.files && e.target.files[0]){
            if(e.target.files[0].size > 1500000){
                setErrorMessage('Image must be smaller than 1.5mb');
                setImage('');
                e.target.files = null;
                return;
            }
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);

            reader.onloadend = async function(){
                const base64Image = reader.result;
                if(typeof base64Image === 'string'){
                    setImage(base64Image);
                }
            }
        }else{
            console.log('no image uploaded')
        }
    }

    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(errorMessage != ''){
            return
        }
        if(email.trim() === '' || password.trim() === '' || username.trim() === ''){
            setErrorMessage('Fields cannot be empty');
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
                username: username,
                password: password,
                profilePic: image
            })
        };
        
        const result = await apiRequest('/auth/signup', payload);
        if(result){
            console.log(result.message);
            setLoading(false);
            navigate('/complete');
        }else{
            setLoading(false);
            setErrorMessage('error');
        }
    };

    useEffect(()=>{
        if(authStore.isLoggedIn){
            navigate("/");
        }
    }, [authStore.isLoggedIn])

    return(
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
                    <h1>Register</h1>
                    <img 
                        src={image || "blank_profile.jpg"}
                        className='register-image'
                    />
                    <input 
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />
                    <input 
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange={function(e){setUsername(e.target.value); setErrorMessage('')}}
                    />
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
                    <button type="submit" disabled={errorMessage != ''}>REGISTER</button>
                    <p><Link to='/login' className='link'>BACK TO LOGIN</Link></p>
                    <p className='error'>{errorMessage}</p>
                </form>
            }
        </div>
    )
};

export default SignUpPage;