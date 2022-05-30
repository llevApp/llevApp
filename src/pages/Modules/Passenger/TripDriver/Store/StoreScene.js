import create from 'zustand';
export const useStoreTripDriver = 
    create( 
        (set) => {
            return {
                origin:undefined,
                destination:undefined,
                setOrigin: (value) => set({ origin: value }),
                setDestination: (value) => set({ destination: value })
            }
        }
);
