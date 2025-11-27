import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from './store/useChatStore';

import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CompletePage from './pages/CompletePage';
import ProfilePage from "./pages/ProfilePage";

import Sidebar from './components/Sidebar';

function App() {

    const authStore = useAuthStore();
    const chatState = useChatStore();

    const navigate = useNavigate();

    useEffect(()=>{
        authStore.authenticate();
    }, []);

    useEffect(()=>{
        if(authStore.isLoggedIn === true){
            chatState.grabContacts();
            chatState.getChatPartners();
        }else{
            navigate('/login');
        }
    }, [authStore.isLoggedIn]);

    return (
        <div className="my-app">
            <div className="my-app-container">
                <Sidebar />
                <div className="main-view background">
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/complete' element={<CompletePage />} />
                        <Route path='/profile/:id' element={<ProfilePage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App;