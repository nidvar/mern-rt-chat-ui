import { Link } from 'react-router-dom';

import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = function(){

    const authState = useAuthStore();

    const updateProfile = async function(){
        return
        const payload = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include' as RequestCredentials,
            body: JSON.stringify({
                profileImage: '',
            })
        };

        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/update', payload);
        const data = await res.text();
        console.log(data);
    };

    return(
        <div className='profile-page'>
            <img className="profile-page-image" src={authState.authUser.profilePic || "blank_profile.jpg"} />
            <button onClick={updateProfile}>UPDATE</button>
            <Link to='/'>BACK</Link>
        </div>
    )
};

export default ProfilePage;