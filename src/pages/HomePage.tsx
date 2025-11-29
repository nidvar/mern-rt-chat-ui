import { useEffect, useState } from "react";

import { useChatStore } from '../store/useChatStore';
// import { useAuthStore } from "../store/useAuthStore";

import ContactsList from '../components/ContactsList';
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import MobileHeader from "../components/MobileHeader";

import type { MessageType } from "../utils/types";

const HomePage = function(){
    const chatStore = useChatStore();

    const [messages, setMessages] = useState<MessageType[] | null>(null);

    const updateMessages = function(){
        const arr = [] as MessageType[];;
            chatStore.totalChatHistory.forEach((item)=>{
                if(
                    item.recieverId === chatStore.selectedChatPartner?._id || 
                    item.senderId === chatStore.selectedChatPartner?._id){
                        arr.push(item);
                    }
            });
            setMessages(arr);
    }

    useEffect(()=>{
        if(chatStore.selectedChatPartner != null){
            updateMessages();
        }
    }, [chatStore.selectedChatPartner]);

    useEffect(()=>{
        updateMessages();
    }, [chatStore.totalChatHistory])

    return(
        <div className="chat-page">
            {
                window.innerWidth < 700?
                <>
                    {
                        chatStore.selectedChatPartner && chatStore.view === '' ?
                        <ChatContainer messages={messages} chatPartner={chatStore.selectedChatPartner} />:
                        <>
                            <MobileHeader />
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