import { Link, useNavigate } from 'react-router-dom';

import { useChatStore } from '../store/useChatStore';

import ContactsList from '../components/ContactsList';
import ChatList from "../components/ChatList";

type SidebarTypes = {
    isLoggedIn: boolean
    profilePic: string
    logout: ()=> void
};

const Sidebar = function({logout, isLoggedIn, profilePic}: SidebarTypes){
    const chatStore = useChatStore();
    const navigate = useNavigate();
    return(
        <>
            {
                isLoggedIn?
                <div className='sidebar'>
                    <div className='column inner-sidebar'>
                        <div className='top-sidebar-nav desktop-nav'>
                            <Link to='/profile'>
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
                        </div>

                        <div className='desktop-sidebar'>
                            {
                                chatStore.view === 'chats'?
                                <ChatList allChatPartners={chatStore.allChatPartners} />
                                :<ContactsList allContacts={chatStore.allContacts} />
                            }
                        </div>

                    </div>
                    <span onClick={logout} className='icons'>
                        <img src={'logout_icon.png'} />
                    </span>
                </div>:''
            }
        </>
    )
};

export default Sidebar;