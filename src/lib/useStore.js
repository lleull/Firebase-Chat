import { create } from "zustand";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

const useUserStore = create((set) => ({
    currentUser: false,
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
            console.log("RErer", error)

            
        }
        
    }

}))

export default useUserStore