import create from 'zustand';
export const useTripsStore = 
    create(
        (set) => {
            return {
                arraylist:undefined,
                latitude:undefined,
                longitude:undefined,
                initTripTime:undefined,
                setLatitude: (value) => set({ latitude: value }),
                setLongitude: (value) => set({ longitude: value }),
                setInitTripTime: (value) => set({ initTripTime: value }),
                setError: (error) => set({ error }),
                loading:false,
                
                setTripsPassenger: (endpoint) => {
                    set({ loading: true, error: null });
                    let url = endpoint;
                    console.log(url);
                    fetch(url)
                        .then((response)=>response.json())
                        .then((json)=>set({arraylist:json}))
                        .catch((error)=>alert(error))
                        .finally( ()=>set({ loading:false  }));
                
                },
                
                clearAll: () => {
                localStorage.clear();
                set({
                    latitude:undefined,
                    longitude: undefined,
                    initTripTime: undefined,
                }); 
                }
            };
        }
);
