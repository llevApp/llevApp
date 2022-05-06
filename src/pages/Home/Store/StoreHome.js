import create from 'zustand';
import { persist } from 'zustand/middleware';
import {getUserData} from 'services/account';
export const useUserStore = 
    create(
        persist(
        (set) => {
            return {
                idUser:undefined,
                firstName: undefined,
                lastName: undefined,
                email: undefined,
                loading:undefined,
                error:undefined,
                tripsDriver:[],
                tripsPassenger:[],
                setIdUser: (value) => set({ idUser: value }),
                setFirstName: (value) => set({ firstName: value }),
                setLastName: (value) => set({ lastName: value }),
                setEmail: (value) => set({ email: value }),
                setTripsDriver: (value) => set({ tripsDriver: value }),
                setTripsPassenger: (value) => set({ tripsPassenger: value }),
                setLoading: (value) => set({ loading: value }),
                setError: (error) => set({ error }),
                userData: ({ endpoint,email }) => {
                    set({ loading: true, error: null });
                    let data = getUserData(endpoint,email);
                    if(data){
                        const { idUser,firstName,lastName,email,tripsDriver,tripsPassenger} = data.result;
                        set({idUser,firstName,lastName,email,tripsDriver,tripsPassenger});
                        set({ loading: false, error: null });
                    } else {
                        set({
                            loading: false,
                            error: { message: 'No se encuentra data del usuario.' }});
                    }
                },
                clearAll: () => {
                localStorage.clear();
                set({
                    idUser:undefined,
                    firstName: undefined,
                    lastName: undefined,
                    email: undefined,
                    loading:undefined,
                    error:undefined,
                    tripsDriver:[],
                    tripsPassenger:[],
                });
                }
            };
        }, 
        {
            name: 'account',
            getStorage: () => localStorage
          }
        
        )
);
