import { useStore } from "zustand";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const useUserStore = useStore((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null, isLoading: false }) 
        
        try {
            const user = doc(db, "users", uid)
            const userSnap = await getDoc(user)
            if (userSnap.exists()) {
                set({currentUser:userSnap.data(), isLoading:false})
            } else {
                set({currentUser:null, isLoading:false})
            }
            
        } catch (error) {

            
        }
        
    }
}))

export default useUserStore