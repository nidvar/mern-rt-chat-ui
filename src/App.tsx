import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect } from "react";

import SignUpPage from './pages/SignUpPage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import CompletePage from "./pages/CompletePage.tsx";

import { useAuthStore } from "./store/useAuthStore.ts";
import ProfilePage from "./pages/ProfilePage.tsx";

import Sidebar from './components/Sidebar.tsx';

const baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const logout = async function(){
        const payload = {
            method: 'POST',
            credentials: 'include' as RequestCredentials
        };
        await fetch(baseURL + '/auth/logout', payload);
        useAuthStore.setState({
            isLoggedIn: false,
            authUser: {
                username: '',
                email: '',
                profilePic: '',
            },
        });
         navigate('/login');
    }

    useEffect(()=>{
        authStore.authenticate();
    }, []);

    return (
        <>
            <div className="my-app">
                <div className="my-app-container">
                    <Sidebar logout={logout} isLoggedIn={authStore.isLoggedIn} profilePic={authStore.authUser.profilePic} />
                    <div className="main-view">
                        <Routes>
                            <Route path='/' element={<ChatPage />} />
                            <Route path='/signup' element={<SignUpPage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/complete' element={<CompletePage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;