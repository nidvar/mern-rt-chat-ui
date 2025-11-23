import { Link } from 'react-router-dom';

import { useAuthStore } from "../store/useAuthStore";

import { daysAgoLabel } from "../utils/utils"

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
    return(
        <div className="chat-container column">
            {
                chatPartner?
                <>
                    <div className="chat-container-header">
                        <Link to='/profile'>
                            <img src={chatPartner?.profilePic || "blank_profile.jpg"} className='profile-image'/>
                        </Link>
                        {chatPartner?.username} 
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
                </>:''
            }
        </div>
    )
};

export default ChatContainer;