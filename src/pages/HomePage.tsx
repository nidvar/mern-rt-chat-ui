import { useEffect, useState } from "react";

import { useChatStore } from '../store/useChatStore';

import ContactsList from '../components/ContactsList';
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import MobileHeader from "../components/MobileHeader";
import { useAuthStore } from "../store/useAuthStore";

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
    const chatStore = useChatStore();
    const authStore = useAuthStore();

    const [messages, setMessages] = useState<MessageType[] | null>(null);

    const grabChats = async function(){
        const res = await fetch(baseUrl + '/messages/' + chatStore.selectedChatPartner?._id, {
            method: 'GET',
            credentials: 'include' as RequestCredentials
        });
        const data = await res.json();
        console.log(data);
        setMessages(data);
    }

    useEffect(()=>{
        if(chatStore.selectedChatPartner != null){
            grabChats();
        }
    }, [chatStore.selectedChatPartner]);

    return(
        <div className="chat-page">
            {
                window.innerWidth < 700?
                <>
                    {
                        chatStore.selectedChatPartner && chatStore.view === '' ?
                        <ChatContainer messages={messages} chatPartner={chatStore.selectedChatPartner} />:
                        <>
                            <MobileHeader
                                profilePic={authStore.authUser.profilePic} 
                                id={authStore.authUser.id} 
                                logout={
                                    function (): void {
                                        throw new Error("Function not implemented.");
                                    }
                                }
                            />
                            {
                                chatStore.view === 'chats'?
                                <ChatList allChatPartners={chatStore.allChatPartners} />:
                                <ContactsList allContacts={chatStore.allContacts} />
                            }
                        </>
                    }
                </>
                :
                <>
                    {
                        chatStore.selectedChatPartner? 
                        <ChatContainer messages={messages} chatPartner={chatStore.selectedChatPartner} />:
                        ''
                    }
                </>
            }
        </div>
    )
};

export default HomePage;