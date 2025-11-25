import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import { useAuthStore } from "../store/useAuthStore";

import { daysAgoLabel, apiRequest } from "../utils/utils";
import { useChatStore } from '../store/useChatStore';

type ChatPartnerType = {
    _id: string
    username: string
    email: string
    profilePic: string
    createdAt: string
    updatedAt: string
    __v: 0
}

type ChatPartnerProp = {
    messages: Message[] | null
    chatPartner: ChatPartnerType | null
}

type Message = {
    _id: string
    senderId: string
    recieverId: string
    text: string
    createdAt: string
    updatedAt: string
    __v: 0
}

const ChatContainer = ({messages, chatPartner}: ChatPartnerProp)=>{
    const authStore = useAuthStore();
    const chatStore = useChatStore();

    const chatBoxRef = useRef<HTMLDivElement | null>(null);

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        const payload = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({message: message}),
            credentials: 'include' as RequestCredentials
        };
        const result = await apiRequest('/messages/send/' + chatPartner?._id, payload);
        console.log(result);
        setMessage('');
    };

    useEffect(()=>{
        const el = chatBoxRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [messages]);

    return(
        <div className="chat-container column">
            {
                chatPartner?
                <>
                    <div className="chat-container-header">
                        <div className='mobile-back-container'>
                            <span className='icons mobile-back' >
                                <img 
                                    src={'go-back.png'} 
                                    onClick={function(){chatStore.changeView('contacts')}}
                                />
                            </span>
                        </div>
                        <Link to={"/profile/" + chatPartner?._id}>
                            <img 
                                src={chatPartner?.profilePic || "blank_profile.jpg"} className='profile-image'
                            />
                            <span>{chatPartner?.username}</span>
                        </Link>
                    </div>
                    <div className="chat-box" ref={chatBoxRef}>
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
                                        <p className="message-time">{daysAgoLabel(item.createdAt)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="message-input">
                            <form onSubmit={function(e){handleSubmit(e)}}>
                                <input
                                    value={message}
                                    onChange={function(e){setMessage(e.target.value);}}
                                />
                                <button>SEND</button>
                            </form>
                        </div>
                </>:''
            }
        </div>
    )
};

export default ChatContainer;