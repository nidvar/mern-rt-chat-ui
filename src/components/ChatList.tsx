import { useChatStore } from '../store/useChatStore';

type userType = {
    _id: string
    username: string
    email: string
    profilePic: string
    refreshToken: string
    createdAt: string
    updatedAt: string
    __v: 0
}

type allChatPartnersPropsType = {
    allChatPartners: userType[]
}

const ChatList = ({allChatPartners}: allChatPartnersPropsType)=>{
    const chatState = useChatStore();
    console.log(allChatPartners);
    return(
        <>
            <div>
                {allChatPartners.map((item)=>{
                    return(
                        <div 
                            className='chats-link'
                            key={item._id}
                            onClick={function(){chatState.toggleSingleChatView(item._id)}}
                        >
                            <img src={item.profilePic} className="profile-image"/>
                            <div>
                                <p>{item.username}</p>
                                <p>.....</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default ChatList;