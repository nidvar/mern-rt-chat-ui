type AuthStore = {
    isLoading: boolean
    isLoggedIn: boolean
    errorMessage: string
    authUser: {
        username: string
        email: string
        profilePic: string
    },
    authenticate: ()=> void
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

import { create } from 'zustand';

export const useAuthStore = create<AuthStore>(function(set){
    return {
        isLoading: false,
        isLoggedIn: false,
        errorMessage: '',
        authUser: {
            username: '',
            email: '',
            profilePic:'',
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
                    console.log(data);
                    set({isLoggedIn: data.isLoggedIn});
                }else{
                    console.log(res);
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