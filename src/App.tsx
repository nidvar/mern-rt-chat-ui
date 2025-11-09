import { Routes, Route } from "react-router-dom";

import SignUpPage from './pages/SignUpPage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import LoginPage from './pages/LoginPage.tsx';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<ChatPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </>
    )
}

export default App;