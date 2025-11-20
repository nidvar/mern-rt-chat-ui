type ChatStoreType = {
    allChats: []
    allMembers: []
    showAllChats: boolean
    showMembers: boolean
    showSingleChat: boolean
    toggleAllChatView: ()=> void
    toggleMemberView: ()=> void
    toggleSingleChatView: ()=> void
    grabContacts: ()=> void
    getAllChats: ()=> void
};

import { create } from 'zustand';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useChatStore = create<ChatStoreType>(function(set){
    return {
        allChats: [],
        allMembers: [],
        showAllChats: false,
        showMembers: false,
        showSingleChat: false,
        toggleAllChatView: () => {
            set({
                showAllChats: true,
                showMembers: false,
                showSingleChat: false,
            });
        },
        toggleMemberView: () => {
            set({
                showAllChats: false,
                showMembers: true,
                showSingleChat: false,
            });
        },
        toggleSingleChatView: () => {
            set({
                showAllChats: false,
                showMembers: false,
                showSingleChat: true,
            });
        },
        grabContacts: async ()=>{
            const res = await fetch(baseUrl + '/messages/contacts', {
                credentials: 'include'
            });
            const data = await res.json();
            console.log(data);
            set({allMembers: data.users})
        },
        getAllChats: async ()=>{
            const res = await fetch(baseUrl + '/messages/chats', {
                credentials: 'include'
            });
            const data = await res.json();
            console.log(data);
            set({allChats: data})
        }
    }
})