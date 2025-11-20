type ChatPartnerProp = {
    chatPartner: string
}

const ChatContainer = ({chatPartner}: ChatPartnerProp)=>{
    console.log(chatPartner);
    return(
        <>
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
        </>
    )
};

export default ChatContainer;