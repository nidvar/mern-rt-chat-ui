import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

import type { UserType } from "../utils/types";

type allChatPartnersPropsType = {
    allChatPartners: UserType[]
}

const ChatList = ({allChatPartners}: allChatPartnersPropsType)=>{
    const chatState = useChatStore();
    const authStore = useAuthStore();
    const navigate = useNavigate();

    useEffect(()=>{
    }, [chatState.allChatPartners]);

    return(
        <div className='chat-list'>
            {allChatPartners.map((item)=>{
                return(
                    <div 
                        className='chats-link'
                        key={item._id}
                        onClick={function(){chatState.selectChat(item); navigate('/')}}
                    >
                        <img src={item.profilePic} className="profile-image"/>
                        <div>
                            <p>{item.username}
                                {authStore.onlineUsers.includes(item._id || '')? 
                                <span className='online-status'> - &#128994; online</span>:
                                <span className='offline-status'> - &#9898; offline</span>}
                            </p>
                            <p>.....</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default ChatList;