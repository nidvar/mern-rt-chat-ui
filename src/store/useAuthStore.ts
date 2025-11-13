type AuthStore = {
    isLoading: boolean
    isLoggedIn: boolean
    authUser: {
        username: string
        email: string
    },
    authenticate: ()=> void
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

import { create } from 'zustand';

export const useAuthStore = create<AuthStore>(function(set){
    return {
        isLoading: false,
        isLoggedIn: false,
        authUser: {
            username: '',
            email: ''
        },
        authenticate: async function(){
            try{
                set({isLoading:true});
                const res = await fetch(baseURL + '/auth/checkAuth', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                console.log(data);
                set({isLoggedIn: true});
            }catch(error){
                console.log(error);
            }finally{
                set({isLoading:false});
            }
        }
    }
})