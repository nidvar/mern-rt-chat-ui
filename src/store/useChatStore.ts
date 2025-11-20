type ChatStoreType = {
    selectedChatPartner: string,
    allChatPartners: []
    allContacts: []
    showAllChats: boolean
    showContacts: boolean
    showSingleChat: boolean
    toggleAllChatView: ()=> void
    toggleMemberView: ()=> void
    toggleSingleChatView: (id: string)=> void
    grabContacts: ()=> void
    getChatPartners: ()=> void
};

import { create } from 'zustand';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useChatStore = create<ChatStoreType>(function(set){
    return {
        selectedChatPartner:'',
        allChatPartners: [],
        allContacts: [],
        showAllChats: false,
        showContacts: false,
        showSingleChat: false,
        toggleAllChatView: () => {
            set({
                showAllChats: true,
                showContacts: false,
                showSingleChat: false,
            });
        },
        toggleMemberView: () => {
            set({
                showAllChats: false,
                showContacts: true,
                showSingleChat: false,
            });
        },
        toggleSingleChatView: (id: string) => {
            set({
                showAllChats: false,
                showContacts: false,
                showSingleChat: true,
                selectedChatPartner: id
            });
        },
        grabContacts: async ()=>{
            const res = await fetch(baseUrl + '/messages/contacts', {
                credentials: 'include'
            });
            const data = await res.json();
            console.log(data);
            set({allContacts: data.users})
        },
        getChatPartners: async ()=>{
            const res = await fetch(baseUrl + '/messages/chatpartners', {
                credentials: 'include'
            });
            const data = await res.json();
            console.log(data);
            set({allChatPartners: data})
        }
    }
})