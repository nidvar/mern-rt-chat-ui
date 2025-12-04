import { create } from 'zustand';

import { apiRequest } from '../utils/utils';
import type { UserType, MessageType } from "../utils/types";

type ChatStoreType = {
    totalChatHistory: MessageType[]
    view: string
    selectedChatPartner: UserType | null
    allChatPartners: []
    allContacts: []
    selectChat: (chatPartner: UserType)=> void
    grabContacts: ()=> void
    getChatPartners: ()=> void
    changeView: (view: string)=> void
};

export const useChatStore = create<ChatStoreType>(function(set){
    return {
        totalChatHistory: [],
        view: '',
        selectedChatPartner: null,
        allChatPartners: [],
        allContacts: [],
        selectChat: (chatPartner: UserType) => {
            set({
                selectedChatPartner: chatPartner,
                view: ''
            });
        },
        grabContacts: async ()=>{
            const data = await apiRequest('/messages/contacts', {});
            set({allContacts: data.users});
        },
        getChatPartners: async ()=>{
            const data = await apiRequest('/messages/chatpartners', {});
            set({allChatPartners: data})
        },
        changeView: function(view: string){
            set({view: view});
        }
    }
})