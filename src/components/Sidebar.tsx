import { Link } from 'react-router-dom';
import { useState } from 'react';

type SidebarTypes = {
    isLoggedIn: boolean
    profilePic: string
    logout: ()=> void
};

const Sidebar = function({logout, isLoggedIn, profilePic}:SidebarTypes){
    const [showChats, setShowChats] = useState(false);

    const toggleChats = function(){
        const showChatState = showChats;
        setShowChats(!showChatState);
    }
    return(
        <>
            <div className='sidebar'>
                <Link to='/'>HOME</Link>
                <br />
                {
                    isLoggedIn?
                    <div>
                        <Link to='/profile'>
                            <img src={profilePic || "blank_profile.jpg"} className='profile-image'/>
                        </Link>
                        <br /><br />
                        <button onClick={toggleChats}>Chats</button>
                        <br /><br />
                        <button onClick={logout}>L-OUT</button>
                    </div>: 
                    <div>
                        <div>
                            <Link to='/login'>L-IN</Link>
                        </div>
                        <div>
                            <Link to='/signup'>S-UP</Link>
                        </div>
                    </div>
                }
            </div>
        </>
    )
};

export default Sidebar;