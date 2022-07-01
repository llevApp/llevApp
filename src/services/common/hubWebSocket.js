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
                        const json = JSON.parse(value);
                        const message = json?.request;
                       if( message != undefined ){
                            let msg = {
                                tripId:message?.trip_id,
                                userId:message?.user_id,
                                latitude: message?.latitude,
                                longitude: message?.longitude,
                                contribution: message?.contribution,
                                name:message?.user_name
                            }
                        set({ messages: msg })
                        }
                    }
                ,
                setMessagesPassenger: (value) => 
                {
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
                clearAll: () => {
                    set({
                        conection: undefined,
                        isOpen: false,
                        messages: null,
                        messagesPassenger:null
                    });
                },
        }})