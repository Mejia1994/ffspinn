import {playersCollection, rafflesCollection, ticketsCollection} from "../../../Server/Firebase/Firestore";

const getPlayerCredits = async function (playerId) {
    let player = await playersCollection.doc(playerId).get();
    let {credits} = player.data();

    return credits;
};

const getTicketPrice = async function (raffleId) {
    let ticket = await rafflesCollection.doc(raffleId).get();
    let {ticketPrice} = ticket.data();

    return ticketPrice;
};

const hasEnoughCredits = function (playerCredits, ticketPrice) {
    if ((playerCredits < ticketPrice) || !playerCredits) {
        throw new Error("No tienes suficientes creditos.");
    }
};

const createTicket = async function (playerId, raffleId) {
    return await ticketsCollection.doc().set({playerId, raffleId, activo: true});
};

const discountCredits = async function (playerId, credits) {
    return await playersCollection.doc(playerId).update({credits});
};

export default async function buyTickets(req, res) {
    try {
        let {raffleId} = req.query;
        let playerId = req.cookies.pid;

        let playerCredits = await getPlayerCredits(playerId);
        let ticketPrice = await getTicketPrice(raffleId);

        hasEnoughCredits(playerCredits, ticketPrice);

        let ticket = await createTicket(playerId, raffleId);
        await discountCredits(playerId, (playerCredits - ticketPrice));

        return res.json({ok: true, payload: {data: ticket}});

    } catch (e) {
        return res.json({ok: false, payload: {message: e.message, error: e}});
    }
}