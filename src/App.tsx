import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";

import SignUpPage from './pages/SignUpPage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import CompletePage from "./pages/CompletePage.tsx";

import { useAuthStore } from "./store/useAuthStore.ts";

function App() {
    const authStore = useAuthStore();

    useEffect(()=>{
        authStore.authenticate();
    }, []);

    return (
        <>
            <p>Logged in: {authStore.isLoggedIn}</p>
            {
                authStore.isLoggedIn? 'logged in': 'logged out'
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