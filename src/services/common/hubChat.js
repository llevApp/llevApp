import create from 'zustand';
export const hubChat = 
create( 
    (set) => {
        return {
            connection:undefined,
            isOpen: false,
            messagesDriver: null,
            messagesPassenger:null,
            setConnection: (value) => set({ connection: value }),
            setIsOpen: (value) => set({ isOpen: value }),
            setMessageFromDriver: (value) => {
             console.log('Mensaje para el Driver',value);
/*               const json = JSON.parse(value);
              
              const message = json.request;
               if(message){
                let msg = {
                    tripId:message.trip_id,
                    userId:message.user_id,
                    latitude: message.latitude,
                    longitude: message.longitude,
                    contribution: message.contribution,
                }
                set({ messages: msg })} */
            }
            ,
            setMessageFromPassenger: (value) => 
            {
                console.log('Mensaje para el Pasajero : ',value);
/*                 const json = JSON.parse(value);
                const message = json.response;
                let msg = {
                        status:message?.status,
                        trip_id:message?.trip_id,
                        user_id:message?.user_id
                    }
                set({ messagesPassenger: msg }) */
            },
            clearMessagesDriver: () => set({ messagesDriver: undefined }),
            clearMessagesPassenger: () => set({ messagesPassenger: undefined }),
            clearAll: () => {
                set({
                    conection: undefined,
                    isOpen: false,
                    messagesDriver: null,
                    messagesPassenger:null,
                });
            },
}});