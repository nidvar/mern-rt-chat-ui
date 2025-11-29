import { useNavigate } from 'react-router-dom';

import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

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
    const authStore = useAuthStore();
    const navigate = useNavigate();
    return(
        <div className='contacts-list'>
            {
                allContacts.map((item: userType)=>{
                    return(
                        <div
                            className="chats-link"
                            key={item._id} 
                            onClick={function(){chatState.selectChat(item); navigate('/')}}
                        >
                            <img src={item.profilePic} className="profile-image"/>
                            <p>{item.username}
                                {authStore.onlineUsers.includes(item._id)? 
                                <span className='online-status'> - &#128994; online</span>:
                                <span className='offline-status'> - &#9898; offline</span>}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ContactsList;