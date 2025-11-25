import { Link, useNavigate } from 'react-router-dom';

import { useChatStore } from '../store/useChatStore';

type SidebarTypes = {
    profilePic: string
    id: string
    logout: ()=> void
};

const MobileHeader = function({logout, profilePic, id}: SidebarTypes){
    const chatStore = useChatStore();
    const navigate = useNavigate();
    return(
        <div className="mobile-header">
            <Link to={'profile/' + id}>
                <img src={profilePic || "blank_profile.jpg"} className='profile-image'/>
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

            <span onClick={logout} className='icons'>
                <img src={'logout_icon.png'} />
            </span>
        </div>
    )
};

export default MobileHeader;