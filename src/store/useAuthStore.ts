import { io, Socket } from "socket.io-client";
import { create } from 'zustand';

import { apiRequest } from "../utils/utils";
import { useChatStore } from "./useChatStore";

import type { MessageType } from "../utils/types";

type AuthStore = {
    socket: Socket | null
    onlineUsers: string[]
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

export const useAuthStore = create<AuthStore>(function(set, get){
    return {
        socket: null,
        onlineUsers: [],
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
                const res = await fetch('/auth/checkAuth', {
                    credentials: 'include',
                });
                if(res.ok){
                    const data = await res.json();
                    set(()=>{
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
                    setTimeout(()=>{get().connectSocket()}, 500)
                }else{
                    if(res.statusText){
                        set({errorMessage: res.statusText});
                    }
                }
            }catch(error){
                console.log(error);
            }finally{
                console.log('finished');
            }
        },
        connectSocket: ()=>{
            const socket = io({
                withCredentials: true,
            });
            socket.connect();
            set({socket: socket});
            socket.on('getOnlineUsers', (onlineUsers)=>{
                useAuthStore.setState({
                    onlineUsers: onlineUsers
                })
            });
            socket.on('allMessagesOnLogin', (arg)=>{
                useChatStore.setState({totalChatHistory: arg})
            });
            socket.on('singleMessage', (arg)=>{
                useChatStore.setState((state) => ({
                    totalChatHistory: [...state.totalChatHistory, ...arg]
                }));
            });
        },
        disconnectSocket: ()=>{
            console.log('discon to socket');
            if(get().socket?.connected){
                get().socket?.disconnect();
            }
        },
        grabAllChats: async function(){
            const socket = io({
                withCredentials: true,
            });
            socket.connect();
            set({socket: socket});
            socket.on('allMessages', (messages) => {
                messages.forEach((item: MessageType)=>{
                    console.log(item)
                });
            });
        }
    }
})