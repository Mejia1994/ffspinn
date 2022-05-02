import create from 'zustand'
import Cookie from "js-cookie";

export const usePlayerState = create((set, get) => {
    return {
        credits: 0,
        playerId: null,

        clear() {
            this.playerId = null
            this.credits = 0
        },

        updatePlayerId() {
            if (get().playerId !== Cookie.get('pid')) {
                set({playerId: Cookie.get('pid')})
            }
        }
    }
});

export const useAppState = create(() => {
    return {
        appName: 'ffspinn',
        sidebarOpen: false,
    }
});

export const useAlertModalState = create((set) => {
    return {
        open: false,
        title: 'Aviso',
        message: 'Mensaje de prueba',
        onAccept: function () {
            set({open: false})
        }
    }
});

export const useLoadingState = create((set) => {

    return {
        active: false,
        title: 'Loading'
    }
});

export const useRaffleState = create((set, get) => {

    let example = {
        id: null,
        date: null,
        awards: [],
        ticketPrice: null,
        yourTickets: 0,
        participants: 0
    };

    return {
        raffles: [],
    };
});

export const useDirectLinkState = create((set, get) => {

    const directLink = [
        "https://synchronizerobot.com/t5p6yujfj?key=1ab97efe74d4496ce403f45dea25c786",
        "https://synchronizerobot.com/cu7n4j24e6?key=0e3b34c370657ee8e0f030cc26e44c33",
        "https://synchronizerobot.com/sd6dpcsck?key=05db5fd26a6c18d56b3e0fb012a1dff3",
        "https://synchronizerobot.com/t5p6yujfj?key=1ab97efe74d4496ce403f45dea25c786"
    ];

    return {
        getDirectLink: function () {
            let index = Math.floor(Math.random() * directLink.length);
            return directLink[index];
        }
    }
});