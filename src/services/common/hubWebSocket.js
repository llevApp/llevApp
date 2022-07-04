import create from 'zustand';
export const hubWebSocket = 
    create( 
        (set) => {
            return {
                conection:undefined,
                isOpen: false,
                messages: null,
                messagesPassenger:null,
                setConection: (value) => set({ conection: value }),
                setIsOpen: (value) => set({ isOpen: value }),
                setMessages: (value) => 
                    {
                       if( value != undefined ){
                            let msg = {
                                tripId:value?.trip_id,
                                userId:value?.user_id,
                                latitude: value?.latitude,
                                longitude: value?.longitude,
                                location:value?.location,
                                contribution: value?.contribution,
                                name:value?.user_name
                            }
                            set({ messages: msg })
                        }
                    }
                ,
                setMessagesPassenger: (value) => 
                {
                    console.log('Estamos desde el hub web socket');
                    const json = JSON.parse(value);
                    const message = json?.response;
                    if(message!=undefined || message){
                    let msg = {
                            status:message?.status,
                            trip_id:message?.trip_id,
                            user_id:message?.user_id
                        }
                    set({ messagesPassenger: msg })
                    }
                }
                ,
                clearMessages: () => set({ messages: undefined }),
                clearMessagesPassenger: () => set({ messagesPassenger: undefined }),
                clearAll: () => {
                    set({
                        conection: undefined,
                        isOpen: false,
                        messages: null,
                        messagesPassenger:null
                    });
                },
        }})