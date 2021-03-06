import create from 'zustand';
export const useUserStore = 
    create( 
        (set) => {
            return {
                idUser:undefined,
                name:undefined,
                nickname:undefined,
                email: undefined,
                careerName:undefined,
                avatarUrl:undefined,
                loadingChangeAvatar: false,
                loading:undefined,
                error:undefined,
                dataUser:undefined,
                tripsDriver:[],
                tripsPassenger:[],
                hasActiveTrip: false,
                setIdUser: (value) => set({ idUser: value }),
                setName: (value) => set({ name: value }),
                setNickname: (value) => set({ nickname: value }),
                setEmailUser: (value) => set({ email: value }),
                setCarrerName: (value) => set({ careerName: value }),
                setAvatarUrl: (value) => set({ avatarUrl: value }),
                setLoadingChangeAvatar: (value) => set({ loadingChangeAvatar: value }),
                setTripsDriver: (value) => set({ tripsDriver: value }),
                setHasActiveTrip: (value) => set({ hasActiveTrip: value }),
                setTripsPassenger: (value) => set({ tripsPassenger: value }),
                setLoading: (value) => set({ loading: value }),
                setError: (error) => set({ error }),
                userData: ( endpoint,email ) => {
                    set({ loading: true, error: null });
                   let url = endpoint+email;
                   //console.log(url);
                    fetch(url)
                        .then((response)=>response.json())
                        .then((json)=>set({dataUser:json,idUser:json.user_id,email:json.email,careerName:json.career_name,name:json.name,nickname:json.nickname}))
                        .catch((error)=>alert(error))
                        .finally( ()=>set({ loading:false  }));
                },
                clearAll: () => {
                set({
                    idUser:undefined,
                    name:undefined,
                    nickname:undefined,
                    email: undefined,
                    careerName:undefined,
                    avatarUrl:undefined,
                    loadingChangeAvatar: false,
                    loading:undefined,
                    error:undefined,
                    dataUser:undefined,
                    loading:undefined,
                    error:undefined,
                    hasActiveTrip:false,
                    tripsDriver:[],
                    tripsPassenger:[]
                });
                }
            };
        }, 
       
        
        
);
