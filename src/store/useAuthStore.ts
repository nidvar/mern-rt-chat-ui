type AuthStore = {
    isLoading: boolean
    isLoggedIn: boolean
    errorMessage: string
    authUser: {
        username: string
        email: string
        profilePic: string
        id: string
    },
    authenticate: ()=> void
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

import { create } from 'zustand';

export const useAuthStore = create<AuthStore>(function(set){
    return {
        allContacts: [],
        chats: [],
        isLoading: false,
        isLoggedIn: false,
        errorMessage: '',
        authUser: {
            username: '',
            email: '',
            profilePic:'',
            id:''
        },
        authenticate: async function(){
            try{
                set({isLoading:true});
                const res = await fetch(baseURL + '/auth/checkAuth', {
                    method: 'GET',
                    credentials: 'include',
                });
                if(res.ok){
                    const data = await res.json();
                    set((state)=>{
                        return {
                            isLoggedIn: data.isLoggedIn,
                            authUser: {
                                ...state.authUser,
                                profilePic: data.userData.profilePic,
                                id: data.userData._id
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
                set({isLoading:false});
            }
        }
    }
})