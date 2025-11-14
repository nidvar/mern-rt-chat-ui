import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SignUpPage = function(){

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [image, setImage] = useState<string | null>(null);

    const [errorMessage, setErrorMessage] = useState('');

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
        try{
            const res = await fetch(baseURL + '/auth/signup', payload);
            if(res.ok){
                const data = await res.json();
                console.log(data.message);
                navigate('/complete');
            }else{
                const error = await res.json();
                console.log(error);
                setErrorMessage('error');
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
                    <img 
                        src={image || "blank_profile.jpg"}
                    />
                    <br />
                    <br />

                    <input 
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />
                    <br />
                    <br />

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

                    <button type="submit" disabled={errorMessage != ''}>REGISTER</button>
                </form>
                <p>{errorMessage}</p>
            </div>
        </>
    )
};

export default SignUpPage;