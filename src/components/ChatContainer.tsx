type ChatPartnerProp = {
    messages: Message[] | null
}

type Message = {
    _id: string
    senderId: string
    recieverId: string
    text: string
    createdAt: string
    updatedAt: string
    __v: 0
}

const ChatContainer = ({messages}: ChatPartnerProp)=>{
    return(
        <div className="chat-container column">
            <div className="chat-container-header">header</div>
            <div className="chat-container-inner">
                <div className="chat-box">
                    {
                        messages?.map((item)=>{
                            return(
                                <div key={item._id} className="single-message">
                                    <p>{item.text}</p>
                                    <p>{item.createdAt}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="message-input">
                    <textarea>
                    </textarea>
                    <button>SEND</button>
                </div>
            </div>
        </div>
    )
};

export default ChatContainer;