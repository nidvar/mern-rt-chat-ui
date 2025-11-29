import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

import type { UserType } from "../utils/types";

type allChatPartnersPropsType = {
    allChatPartners: UserType[]
}

const ChatList = ({allChatPartners}: allChatPartnersPropsType)=>{
    const chatStore = useChatStore();
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const grabLastMessage = function(userId:string | undefined): string{
        let result = '';
        chatStore.totalChatHistory.forEach((item)=>{
            if(item.recieverId === userId || item.senderId === userId){
                result = item.text;
            }
        });
        let shorten = result.split('');
        if(shorten.length > 10){
            shorten = shorten.splice(0, 10)
        };
        result = shorten.join('')
        return result;
    }

    return(
        <div className='chat-list'>
            {allChatPartners.map((item)=>{
                return(
                    <div 
                        className='chats-link'
                        key={item._id}
                        onClick={function(){chatStore.selectChat(item); navigate('/')}}
                    >
                        <img src={item.profilePic} className="profile-image"/>
                        <div>
                            <p>{item.username}
                                {authStore.onlineUsers.includes(item._id || '')? 
                                <span className='online-status'> - &#128994; online</span>:
                                <span className='offline-status'> - &#9898; offline</span>}
                            </p>
                            <p className='last-message'>{grabLastMessage(item._id)}....</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default ChatList;