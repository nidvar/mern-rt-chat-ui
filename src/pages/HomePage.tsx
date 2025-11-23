import { useEffect, useState } from "react";

import { useChatStore } from '../store/useChatStore';

import ContactsList from '../components/ContactsList';
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type MessageType = {
    _id: string
    senderId: string
    recieverId: string
    text: string
    createdAt: string
    updatedAt: string
    __v: 0
}

const HomePage = function(){
    const chatState = useChatStore();

    const [messages, setMessages] = useState<MessageType[] | null>(null)

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
        <div className="chat-page">
            {
                chatState.showContacts === false &&
                chatState.showAllChats === false &&
                chatState.showSingleChat === false?
                <h1>Chat app</h1>: ''
            }
            <div className="mobile">
                {
                    chatState.showContacts === true?
                    <ContactsList allContacts={chatState.allContacts} />
                    :''
                }
                {
                    chatState.showAllChats === true?
                    <ChatList allChatPartners={chatState.allChatPartners} />
                    :''
                }
            </div>

            {
                chatState.showSingleChat === true?
                <ChatContainer messages={messages} chatPartner={chatState.selectedChatPartner}/>
                :''
            }
        </div>
    )
};

export default HomePage;