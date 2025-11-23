import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

import { daysAgoLabel } from "../utils/utils"

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// type ChatPartnerType = {
//     _id: string
//     username: string
//     email: string
//     profilePic: string
//     createdAt: string
//     updatedAt: string
//     __v: 0
// }

// type ChatPartnerProp = {
//     messages: Message[] | null
//     chatPartner: ChatPartnerType | null
// }

type MessageType = {
    _id: string
    senderId: string
    recieverId: string
    text: string
    createdAt: string
    updatedAt: string
    __v: 0
}

const ChatPage = ()=>{

    const [messages, setMessages] = useState<MessageType[] | null>(null)
    
    const authStore = useAuthStore();
    const chatState = useChatStore();


    const grabChats = async function(){
        const res = await fetch(baseUrl + '/messages/' + chatState.selectedChatPartner?._id, {
            method: 'GET',
            credentials: 'include' as RequestCredentials
        });
        const data = await res.json();
        setMessages(data);
    }

    useEffect(()=>{
        if(chatState.selectedChatPartner != null){
            grabChats();
        }
    }, [chatState.selectedChatPartner]);

    return(
        <div className="chat-container column">
            <div className="chat-container-header">
                <Link to='/profile'>
                    <img src={chatState.selectedChatPartner?.profilePic || "blank_profile.jpg"} className='profile-image'/>
                </Link>
                {chatState.selectedChatPartner?.username} 
            </div>
            <div className="chat-container-inner">
                <div className="chat-box">
                    {
                        messages?.map((item)=>{
                            return(
                                <div 
                                    key={item._id} 
                                    className={
                                        authStore.authUser.id === item.senderId?
                                            'single-message user':
                                            'single-message reciever'
                                        }
                                >
                                    <p>{item.text}</p>
                                    <p>sent by: {item.senderId}</p>
                                    <p>recieved by: {item.recieverId}</p>
                                    <p className="message-time">{daysAgoLabel(item.createdAt)}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="message-input">
                    <textarea>
                    </textarea>
                    <button>SEND</button>
                </div>
            </div>
        </div>
    )
};

export default ChatPage;