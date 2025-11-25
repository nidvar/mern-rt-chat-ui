type AuthStore = {
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
    authenticate: ()=> void
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

import { create } from 'zustand';

export const useAuthStore = create<AuthStore>(function(set){
    return {
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
        authenticate: async function(){
            try{
                const res = await fetch(baseURL + '/auth/checkAuth', {
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
        }
    }
})