import { Link } from "react-router-dom";

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
                <br /><br />
                <Link to='/login'>Login</Link>
            </div>
        </>
    )
};

export default ChatPage;