import { useEffect } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL

const ChatPage = function(){

    const grabMessages = async ()=>{
        const res = await fetch(baseUrl + '/messages/contacts', {
            credentials: 'include'
        });
        const data = await res.json();

        console.log(data);
    }

    useEffect(()=>{
        grabMessages();
    }, []);

    return(
        <>
            <div>
                <h1>Chat Page</h1>
            </div>
        </>
    )
};

export default ChatPage;