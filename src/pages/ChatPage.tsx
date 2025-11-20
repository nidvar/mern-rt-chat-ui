import { useEffect } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from '../store/useChatStore';

import ContactsList from '../components/ContactsList';

const ChatPage = function(){

    const authState = useAuthStore();
    const chatState = useChatStore();

    useEffect(()=>{
        if(authState.isLoggedIn === true){
            chatState.grabContacts();
            chatState.getAllChats();
        };
    }, [authState.isLoggedIn]);

    return(
        <>
            <div>
                <h1>Chat Page</h1>
                <div>
                    {
                        chatState.showContacts === true?
                        <ContactsList allContacts={chatState.allContacts} />:
                        ''
                    }
                    <br />
                    <hr />
                    <div>
                        Chats: 
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div>
                        Chatbox:
                        <br />
                        <br />
                        <textarea>
                        </textarea>
                        <br />
                        <br />
                        <button>SEND</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatPage;