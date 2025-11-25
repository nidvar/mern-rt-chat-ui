import { create } from 'zustand';
import { apiRequest } from '../utils/utils';

type ChatStoreType = {
    view: string
    selectedChatPartner: ChatPartnerType | null
    allChatPartners: []
    allContacts: []
    selectChat: (chatPartner: ChatPartnerType)=> void
    grabContacts: ()=> void
    getChatPartners: ()=> void
    changeView: (view: string)=> void
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

export const useChatStore = create<ChatStoreType>(function(set){
    return {
        view: '',
        selectedChatPartner: null,
        allChatPartners: [],
        allContacts: [],
        selectChat: (chatPartner: ChatPartnerType) => {
            set({
                selectedChatPartner: chatPartner,
                view: ''
            });
        },
        grabContacts: async ()=>{
            const data = await apiRequest('/messages/contacts', {
                credentials: 'include'
            });
            set({allContacts: data.users});
        },
        getChatPartners: async ()=>{
            const data = await apiRequest('/messages/chatpartners', {
                credentials: 'include'
            });
            set({allChatPartners: data})
        },
        changeView: function(view: string){
            set({view: view});
        }
    }
})