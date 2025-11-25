import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import { useAuthStore } from "../store/useAuthStore";

import { daysAgoLabel } from "../utils/utils";

const baseURL = import.meta.env.VITE_API_BASE_URL;

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

    const chatBoxRef = useRef<HTMLDivElement | null>(null);

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        const payload = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({message: message}),
            credentials: 'include' as RequestCredentials
        };
        const res = await fetch(baseURL + '/messages/send/' + chatPartner?._id, payload);
        setMessage('');
        const data = await res.json();
        console.log(data);
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