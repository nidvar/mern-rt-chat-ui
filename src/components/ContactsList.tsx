import React from "react";
import { useChatStore } from '../store/useChatStore';

type contactsType = {
    _id: string
    username: string
    email: string
    profilePic: string
    createdAt: string
}

type contactListProp = {
    allContacts: contactsType[]
}

const ContactsList = ({allContacts}: contactListProp)=>{
    const chatState = useChatStore();
    return(
        <>
            <div>
                {
                    allContacts.map((item: contactsType)=>{
                        return(
                            <React.Fragment key={item._id}>
                                <button 
                                    onClick={function(){chatState.toggleSingleChatView(item._id)}}
                                >{item.username}</button><br/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
};

export default ContactsList;