type ChatType = {
    text?: string
    image?: string
}

type AllChatsType = {
    allChats: ChatType[]
}

const ChatList = ({allChats}: AllChatsType)=>{
    console.log(allChats);
    return(
        <>
            <div>
                {allChats.map((item)=>{
                    return(
                        <div key={Math.random()}>
                            {item.text? item.text:''}
                            {item.image? item.image: ''}
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default ChatList;