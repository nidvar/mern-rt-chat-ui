import { Routes, Route, Link } from "react-router-dom";

import { useEffect } from "react";

import SignUpPage from './pages/SignUpPage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import CompletePage from "./pages/CompletePage.tsx";

import { useAuthStore } from "./store/useAuthStore.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
    const authStore = useAuthStore();

    const logout = async function(){
        const payload = {
            method: 'POST',
            credentials: 'include' as RequestCredentials
        }
        await fetch(baseURL + '/auth/logout', payload);
        useAuthStore.setState({
            isLoggedIn: false,
            authUser: {
                username: '',
                email: ''
            },
        });
    }

    useEffect(()=>{
        authStore.authenticate();
    }, []);

    return (
        <>
            {
                authStore.isLoggedIn? 
                <div><button onClick={logout}>LOGOUT</button></div>: 
                <div><Link to='/login'>Login</Link></div>
            }
            <Routes>
                <Route path='/' element={<ChatPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/complete' element={<CompletePage />} />
            </Routes>
        </>
    )
}

export default App;