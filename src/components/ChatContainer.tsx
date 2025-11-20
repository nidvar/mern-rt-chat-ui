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
        <>
            <div>
                {
                    messages?.map((item)=>{
                        return(
                            <div>
                                <p>{item.text}</p>
                                <p>{item.createdAt}</p>
                            </div>
                        )
                    })
                }
                <br />
                <br />
                <textarea>
                </textarea>
                <br />
                <br />
                <button>SEND</button>
            </div>
        </>
    )
};

export default ChatContainer;