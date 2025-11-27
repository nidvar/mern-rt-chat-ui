import { Link, useNavigate } from 'react-router-dom';

import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const MobileHeader = function(){
    const chatStore = useChatStore();
    const authStore = useAuthStore();
    const navigate = useNavigate();
    return(
        <div className="mobile-header">
            <Link to={'profile/' + authStore.authUser.id}>
                <img src={authStore.authUser.profilePic || "blank_profile.jpg"} className='profile-image'/>
            </Link>
            <span
                className='icons'
                onClick={function(){chatStore.changeView('chats'); navigate('/')}}
            >
                <img src={'chat_icon.png'} />
            </span>
            <span
                className='icons'
                onClick={function(){chatStore.changeView('contacts'); navigate('/')}}
            >
                <img src={'contact_icon.png'} />
            </span>

            <span onClick={function(){authStore.logout(); navigate('/login');}} className='icons'>
                <img src={'logout_icon.png'} />
            </span>
        </div>
    )
};

export default MobileHeader;