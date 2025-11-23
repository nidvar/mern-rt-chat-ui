import { create } from 'zustand';

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
            set({allChatPartners: data})
        },
        changeView: function(view: string){
            console.log(view);
            set({view: view});
        }
    }
})