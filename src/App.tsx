import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect } from "react";

import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CompletePage from './pages/CompletePage';

import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from './store/useChatStore';
import ProfilePage from "./pages/ProfilePage";

import Sidebar from './components/Sidebar';


const baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {

    const authStore = useAuthStore();
    const chatState = useChatStore();

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
                id:''
            },
        });
        navigate('/login');
    }

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
                <Sidebar
                    logout={logout}
                    profilePic={authStore.authUser.profilePic} 
                    id={authStore.authUser.id}
                />
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