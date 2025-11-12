type AuthStore = {
    isLoading: boolean
    isLoggedIn: boolean
    authUser: {
        username: string
        email: string
    },
    login: ()=>void
}

import { create } from 'zustand';

export const useAuthStore = create<AuthStore>(function(set){
    return {
        isLoading: false,
        isLoggedIn: false,
        authUser: {
            username: 'bob',
            email: 'bob@mail.com'
        },
        login: function(){
            set({isLoggedIn:true});
            console.log('just logged in')
        }
    }
})