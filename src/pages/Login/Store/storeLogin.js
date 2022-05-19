import create from 'zustand';

const useLoginStore = create((set) => ({
  email: undefined,
  target:"driver",
  setEmail: (value) => set({ email: value }),
  setTarget: (value) => set({ target: value })
})  );
export default useLoginStore;