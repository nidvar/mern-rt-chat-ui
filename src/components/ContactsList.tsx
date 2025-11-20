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
                            <div 
                                className="chats-link"
                                key={item._id} 
                                onClick={function(){chatState.toggleSingleChatView(item._id)}}
                            >
                                <img src={item.profilePic} className="profile-image"/>
                                <p>{item.username}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};

export default ContactsList;