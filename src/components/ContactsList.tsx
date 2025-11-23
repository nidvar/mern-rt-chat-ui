import { useNavigate } from 'react-router-dom';

import { useChatStore } from '../store/useChatStore';

type userType = {
    _id: string
    username: string
    email: string
    profilePic: string
    createdAt: string
    updatedAt: string
    __v: 0
}

type contactListProp = {
    allContacts: userType[]
}

const ContactsList = ({allContacts}: contactListProp)=>{
    const chatState = useChatStore();
    const navigate = useNavigate();
    return(
        <>
            <div>
                {
                    allContacts.map((item: userType)=>{
                        return(
                            <div 
                                className="chats-link"
                                key={item._id} 
                                onClick={
                                    function(){
                                        chatState.toggleSingleChatView(item); 
                                        navigate('/chat');
                                    }
                                }
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