import { create } from "zustand";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";
import useUserStore from "./useStore";
const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isRecieverBlocked: false,
    blocked: [],
    changeChat: async (chatId, user) => {

        const currentUser = await useUserStore.getState().currentUser

        // CHECK IF CURRENT USER IS BLOCKED
        if (user.blocked.includes(currentUser.id)) {

            return set({

                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isRecieverBlocked: false,
            });

        } else if
            // CHECK IF RECIEVER USER IS BLOCKED


            (currentUser.blocked.includes(currentUser.id)) {

            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isRecieverBlocked: false,
            });
        } else {

            set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isRecieverBlocked: false,
            });

        }

    },
    changeBlock: () => {
        set(state => ({
            ...state, isRecieverBlocked: !state.isRecieverBlocked
        }))

    }
}))

export default useChatStore