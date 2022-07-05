import create from 'zustand';
export const useStoreDriver = 
    create( 
        (set) => {
            return {
                showModal:undefined,
                setShowModal: (value) => set({ showModal: value }),
            }
        }
);
