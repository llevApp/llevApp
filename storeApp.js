import create from 'zustand';
export const storeApp = 
    create( 
        (set) => {
            return {
                pushNotification:undefined,
                setPushNotification: (value) => set({ pushNotification: value }),
                cleanAll:()=>{
                    set({pushNotification:undefined})
                }
            };
        }, 
       
        
        
);
