import { useEffect } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from '../store/useChatStore';

import ContactsList from '../components/ContactsList';
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ChatPage = function(){

    const authState = useAuthStore();
    const chatState = useChatStore();

    const grabChats = async function(){
        const res = await fetch(baseUrl + '/messages/' + chatState.selectedChatPartner, {
            method: 'GET',
            credentials: 'include' as RequestCredentials
        });
        console.log(res);
        const data = await res.json();

        console.log(data);
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
                        chatState.showSingleChat?<ChatContainer chatPartner={chatState.selectedChatPartner} />:''
                    }
                </div>
            </div>
        </>
    )
};

export default ChatPage;