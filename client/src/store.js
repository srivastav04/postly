import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      userName: "",
      userId: "",
      userAvatar: "",
      searchUser: "",
      isAdmin: false,
      setUserName: (name) => set(() => ({ userName: name })),
      setUserId: (id) => set(() => ({ userId: id })),
      setUserAvatar: (avatar) => set(() => ({ userAvatar: avatar })),
      setSearchUser: (user) => set(() => ({ searchUser: user })),
      setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

export default useAuthStore;
