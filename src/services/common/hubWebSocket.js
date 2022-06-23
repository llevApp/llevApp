import create from 'zustand';
export const hubWebSocket = 
    create( 
        (set) => {
            return {
                conection:undefined,
                isOpen: false,
                messages: [],
                setConection: (value) => set({ conection: value }),
                setIsOpen: (value) => set({ isOpen: value }),
                setMessages: (value) => 
                    {
                        const json = JSON.parse(value);
                        const message = json.request;
                        let msg = {
                                tripId:message.trip_id,
                                userId:message.user_id,
                                latitude: message.latitude,
                                longitude: message.longitude,
                                contribution: message.contribution,
                                userName:message.user_name,
                                location:message.location
                            }
                        set({ messages: msg })
                    }
                ,
                clearMessages: () => set({ messages: undefined }),
                clearAll: () => {
                    set({
                        conection: undefined,
                        isOpen: false,
                        messages: []
                    });
                },
        }})
        