import { Link } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';

type SidebarTypes = {
    isLoggedIn: boolean
    profilePic: string
    logout: ()=> void
};

const Sidebar = function({logout, isLoggedIn, profilePic}: SidebarTypes){
    const chatStore = useChatStore();

    console.log(chatStore)
    return(
        <>
            <div className='sidebar'>
                <br />
                {
                    isLoggedIn?
                    <>
                        <Link to='/profile'>
                            <img src={profilePic || "blank_profile.jpg"} className='profile-image'/>
                        </Link>
                        <br /><br />
                        <button onClick={function(){chatStore.toggleAllChatView()}}>Chats</button>
                        <br /><br />
                        <button onClick={function(){chatStore.toggleMemberView()}}>Members</button>
                        <br /><br />
                        <button onClick={logout}>L-OUT</button>
                    </>: 
                    <>
                        <div>
                            <Link to='/login'>L-IN</Link>
                        </div>
                        <div>
                            <Link to='/signup'>S-UP</Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
};

export default Sidebar;