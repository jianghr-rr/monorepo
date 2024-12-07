/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export interface UserState {
  user: Record<string, any> | null;
}
export interface UserActions {
  updateUser: (user: Record<string, any>) => void;
}

const useUserStore = create<UserState & UserActions>((set) => ({
  user: null,
  updateUser: (user) => set({ user }),
}));

export default useUserStore;
export { useUserStore };
