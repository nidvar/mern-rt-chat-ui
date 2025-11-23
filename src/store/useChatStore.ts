type ChatStoreType = {
    selectedChatPartner: ChatPartnerType | null
    allChatPartners: []
    allContacts: []
    showAllChats: boolean
    showContacts: boolean
    showSingleChat: boolean
    toggleAllChatView: ()=> void
    toggleMemberView: ()=> void
    toggleSingleChatView: (chatPartner: ChatPartnerType)=> void
    grabContacts: ()=> void
    getChatPartners: ()=> void
};

type ChatPartnerType = {
    _id: string
    username: string
    email: string
    profilePic: string
    createdAt: string
    updatedAt: string
    __v: 0
}

import { create } from 'zustand';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useChatStore = create<ChatStoreType>(function(set){
    return {
        selectedChatPartner: null,
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
        toggleSingleChatView: (chatPartner: ChatPartnerType) => {
            set({
                showAllChats: false,
                showContacts: false,
                showSingleChat: true,
                selectedChatPartner: chatPartner
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
            console.log(111, data);
            set({allChatPartners: data})
        }
    }
})