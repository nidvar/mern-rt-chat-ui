import { useEffect, useState } from "react";

import { useAuthStore } from "../store/useAuthStore";
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

const ChatPage = function(){

    const authState = useAuthStore();
    const chatState = useChatStore();

    const [messages, setMessages] = useState<MessageType[] | null>(null)

    const grabChats = async function(){
        const res = await fetch(baseUrl + '/messages/' + chatState.selectedChatPartner, {
            method: 'GET',
            credentials: 'include' as RequestCredentials
        });
        const data = await res.json();
        setMessages(data);
    }

    useEffect(()=>{
        if(authState.isLoggedIn === true){
            chatState.grabContacts();
            chatState.getChatPartners();
        };
    }, [authState.isLoggedIn]);

    useEffect(()=>{
        if(chatState.selectedChatPartner != ''){
            grabChats();
        }
    }, [chatState.selectedChatPartner])

    return(
        <>
            <div>
                <div>
                    {
                        chatState.showContacts === true?
                        <ContactsList allContacts={chatState.allContacts} />:''
                    }
                    {
                        chatState.showAllChats?<ChatList allChats={chatState.allChatPartners} />:''
                    }
                    {
                        chatState.showSingleChat?<ChatContainer messages={messages}/>:''
                    }
                </div>
            </div>
        </>
    )
};

export default ChatPage;