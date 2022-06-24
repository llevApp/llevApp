import create from 'zustand';
import moment from 'moment';
import {URL_API,TRIPS_DRIVER} from "@env";

export const useTripsStore = 
    create(
        (set) => {
            return {
                tripsArray:undefined,
                setError: (error) => set({ error }),
                loading:false,
                setTripsPassenger2: (endpoint) => {
                    set({ loading: true, error: null });
                    let url = endpoint;
                    console.log(url);
                    fetch(url)
                        .then((response)=>response?.json())
                        .then((json)=>set({tripsArray:json}))
                        .catch((error)=>alert(error))
                        .finally( ()=>set({ loading:false  }));
                }, 
                setTripsPassenger: (userID) => {
                    if (userID) {
                        set({ loading: true, error: null });
                    let url = URL_API+TRIPS_DRIVER+userID;
                    console.log('Esta es la URL: '+url);
                    fetch(url)
                        .then((response)=>response?.json())
                        .then((json)=>set({tripsArray: json?.map((trip,index)=>{
                            let date = moment(trip.init_trip_time).format('MMM DD, YYYY HH:MM')
                            return{
                                id:index,
                                driver:trip.name,
                                start:[trip.latitude,trip.longitude],
                                timeStamp:date,
                                recentText:trip.total_tips,
                                address:trip.address,
                                passengerNumber:trip.total_passenger,
                                avatarUrl: "https://img.icons8.com/officel/80/000000/map-pin.png"
                            }
                        })
                        }))
                        .catch((error)=>alert("Lo sentimos, ha ocurrido un error.",error))
                        .finally( ()=>set({ loading:false  }));
                    }
                    
                }, 
                clearAll: () => {
                set({
                    tripsArray:undefined,
                    
                }); 
                }
            };
        }
);
