import { useEffect } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from '../store/useChatStore';

import React from "react";

type contactsType = {
    _id: string
    username: string
    email: string
    profilePic: string
    createdAt: string
}



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
                        chatState.showMembers === true?
                        <div>
                            Members: <br />{
                                chatState.allMembers?.map((item: contactsType)=>{
                                    return(
                                        <React.Fragment key={item._id}>
                                            <button>{item.username}</button><br/>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>:
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