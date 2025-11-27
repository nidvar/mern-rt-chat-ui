import { io, Socket } from "socket.io-client";
import { create } from 'zustand';

import { apiRequest } from "../utils/utils";

type AuthStore = {
    socket: Socket | null
    isLoggedIn: boolean
    errorMessage: string
    authUser: {
        username: string
        email: string
        profilePic: string
        id: string
        lastLoggedIn: string
        createdAt: string
    },
    logout: ()=> void
    authenticate: ()=> void
    connectSocket: ()=> void
    disconnectSocket: ()=> void
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create<AuthStore>(function(set, get){
    return {
        socket: null,
        allContacts: [],
        chats: [],
        isLoggedIn: false,
        errorMessage: '',
        authUser: {
            username: '',
            email: '',
            profilePic:'',
            id:'',
            createdAt:'',
            lastLoggedIn: '',
        },
        logout: async function(){
            const payload = {
                method: 'POST',
                credentials: 'include' as RequestCredentials
            };
            await apiRequest('/auth/logout', payload);
            get().disconnectSocket();
            useAuthStore.setState({
                isLoggedIn: false,
                authUser: {
                    username: '',
                    email: '',
                    profilePic: '',
                    id:'',
                    createdAt: '',
                    lastLoggedIn: ''
                },
            });
        },
        authenticate: async function(){
            try{
                const res = await fetch(baseURL + '/auth/checkAuth', {
                    credentials: 'include',
                });
                if(res.ok){
                    const data = await res.json();
                    set(()=>{
                        get().connectSocket();
                        return {
                            isLoggedIn: data.isLoggedIn,
                            authUser: {
                                profilePic: data.userData.profilePic,
                                id: data.userData._id,
                                createdAt: data.userData.createdAt,
                                lastLoggedIn: data.userData.lastLoggedIn,
                                username: data.userData.username,
                                email: data.userData.email,
                            }
                        }
                    });
                }else{
                    if(res.statusText){
                        set({errorMessage: res.statusText});
                    }
                }
            }catch(error){
                console.log(error);
            }finally{
                console.log('finished')
            }
        },
        connectSocket: ()=>{
            console.log('connecting to socket')
            const username = get().authUser?.username;
            if(username === ''){
                return
            };
            const socket = io(baseURL, {
                withCredentials: true,
            });
            socket.connect();
            set({socket: socket})
        },
        disconnectSocket: ()=>{
            console.log('discon to socket')
            if(get().socket?.connected){
                get().socket?.disconnect();
            }
        },
    }
})