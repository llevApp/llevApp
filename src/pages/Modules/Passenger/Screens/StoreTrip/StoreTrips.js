import create from 'zustand';
export const useTripsStore = 
    create(
        (set) => {
            return {
                arraylist:undefined,
                setError: (error) => set({ error }),
                loading:false,
                
                setTripsPassenger: (endpoint) => {
                    set({ loading: true, error: null });
                    let url = endpoint;
                   // console.log(url);
                    fetch(url)
                        .then((response)=>response?.json())
                        .then((json)=>set({arraylist:json}))
                        .catch((error)=>alert(error))
                        .finally( ()=>set({ loading:false  }));
                
                }, 
                
                clearAll: () => {
                set({
                    arraylist:undefined,
                    
                }); 
                }
            };
        }
);
