import create from 'zustand';
export const useStoreMessage = 
    create( 
        (set) => {
            return {
                message:undefined,
                setMessage: (value) => set({ message: value })
            }
        }
);
