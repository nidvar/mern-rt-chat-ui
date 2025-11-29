import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from '../store/useChatStore';

import { daysAgoLabel, readableDate } from '../utils/utils';
import type { UserType } from "../utils/types";

const ProfilePage = function(){
    const authState = useAuthStore();
    const chatStore = useChatStore();
    const params = useParams();

    const [currentUser, setCurrentUser] = useState<UserType | null>(null);

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
                const user = chatStore.allContacts.find((item: UserType)=>{
                    if(item._id === params.id){
                        return true;
                    }
                });
                if(user){
                    setCurrentUser(user);
                }
            }
        }
    }, [params])

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
                <div className='member-description'>
                    <p><span className='bold'>Username:</span> {currentUser?.username}</p>
                    <p><span className='bold'>Member since:</span> {readableDate(currentUser?.createdAt)}</p>
                    <p><span className='bold'>Last logged in:</span> {daysAgoLabel(currentUser?.lastLoggedIn)}</p>
                </div>
                
                <Link to='/'>BACK</Link>
            </div>
        </div>
    )
};

export default ProfilePage;