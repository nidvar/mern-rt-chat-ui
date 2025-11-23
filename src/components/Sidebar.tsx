import { Link } from 'react-router-dom';
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
    return(
        <>
            {
                isLoggedIn?
                <div className='sidebar'>
                    <div className='column inner-sidebar'>
                        <div className='column top-sidebar-nav desktop-nav'>
                            <Link to='/'>
                                <button onClick={function(){chatStore.toggleAllChatView()}}>Chats</button>
                            </Link>
                            <Link to='/'>
                                <button onClick={function(){chatStore.toggleMemberView()}}>Contacts</button>
                            </Link>
                        </div>

                        <div className='desktop-sidebar'>
                            {
                                chatStore.showContacts === true?
                                <ContactsList allContacts={chatStore.allContacts} />
                                :''
                            }
                            {
                                chatStore.showAllChats === true?
                                <ChatList allChatPartners={chatStore.allChatPartners} />
                                :''
                            }
                        </div>
                    </div>
                    <div className='column'>
                        <Link to='/profile'>
                            <img src={profilePic || "blank_profile.jpg"} className='profile-image'/>
                        </Link>
                        <button onClick={logout}>L-OUT</button>
                    </div>
                </div>:
                <div className='sidebar'>
                    <div className='login-div'>
                        <Link to='/login'>L-IN</Link>
                    </div>
                    <div className='logout-div'>
                        <Link to='/signup'>S-UP</Link>
                    </div>
                </div>
            }
        </>
    )
};

export default Sidebar;