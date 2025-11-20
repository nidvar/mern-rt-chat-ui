import { useEffect, useState } from "react";

import { useAuthStore } from "../store/useAuthStore";

type contactsType = {
    _id: string
    username: string
    email: string
    profilePic: string
    createdAt: string
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ChatPage = function(){

    const authState = useAuthStore();

    const [contacts, setContacts] = useState<contactsType[] | null>(null);

    const grabContacts = async ()=>{
        const res = await fetch(baseUrl + '/messages/contacts', {
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        setContacts(data.users);
    };

    const getAllChats = async ()=>{
        const res = await fetch(baseUrl + '/messages/chats', {
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
    };

    useEffect(()=>{
        if(authState.isLoggedIn === true){
            grabContacts();
            getAllChats();
        };
    }, [authState]);

    const test = function(){
        console.log(contacts);
    }

    return(
        <>
            <div>
                <h1>Chat Page</h1>
                <div>
                    <div>
                        Members: <br />{
                            contacts?.map((item: contactsType)=>{
                                return(
                                    <>
                                        <button>{item.username}</button><br/>
                                    </>
                                )
                            })
                        }
                    </div>
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
                        <button onClick={test}>TEST</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatPage;