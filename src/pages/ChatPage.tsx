const baseURL = import.meta.env.VITE_API_BASE_URL;

const ChatPage = function(){

    const logout = async function(){
        const payload = {
            method: 'POST',
            credentials: 'include' as RequestCredentials
        }
        await fetch(baseURL + '/auth/logout', payload);
    }

    return(
        <>
            <div>
                <h1>Chat Page</h1>
                <button onClick={logout}>LOGOUT</button>
            </div>
        </>
    )
};

export default ChatPage;