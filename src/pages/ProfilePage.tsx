import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from '../store/useChatStore';

type userType = {
    id?: string
    _id?: string
    username: string
    email: string
    profilePic: string
    createdAt?: string
    updatedAt?: string
    __v?: 0
}

const ProfilePage = function(){
    const authState = useAuthStore();
    const chatStore = useChatStore();
    const params = useParams();

    const [currentUser, setCurrentUser] = useState<userType | null>(null);

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

    useEffect(()=>{
        if(params.id){
            if(params.id === authState.authUser.id){
                setCurrentUser(authState.authUser);
            }else{
                const user = chatStore.allContacts.find((item: userType)=>{
                    if(item._id === params.id){
                        return true;
                    }
                });
                if(user){
                    setCurrentUser(user);
                }
            }
        }
    }, [chatStore.allContacts])

    return(
        <div className='profile-page'>
            <div className='profile-section'>
                <img 
                    className="profile-page-image" 
                    src={currentUser?.profilePic} 
                />
                {
                    params.id === authState.authUser.id?
                    <button onClick={updateProfile}>UPDATE</button>:
                    ''
                }
                <p>Username: {currentUser?.username}</p>
                <p>Member since: {currentUser?.createdAt}</p>
                <p>Last logged in: {}</p>
                <Link to='/'>BACK</Link>
            </div>
        </div>
    )
};

export default ProfilePage;