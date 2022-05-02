import {rafflesCollection, ticketsCollection} from "../../../Server/Firebase/Firestore";

const getTickets = async function (raffleId) {
    let querySnapshot = await ticketsCollection.where("raffleId", "==", raffleId).where("activo", "==", true).get();

    let tickets = [];
    querySnapshot.forEach(doc => tickets.push(doc.data()));

    return tickets;
}

const getRandomTicket = function (tickets) {
    return tickets[Math.floor(Math.random() * tickets.length)];
}

const updateAwardsWinner = async function (raffleId, playerId, place) {

    let raffle = await rafflesCollection.doc(raffleId).get();

    let awards = raffle.data().awards.map(function ({...award}) {
        if (award.place === place) {
            award.playerIdWinner = playerId;
        }

        return award;
    });

    await rafflesCollection.doc(raffleId).update({
        awards
    });
}

const disableTicket = async function (playerId) {
    let querySnapshot = await ticketsCollection.where("playerId", "==", playerId).get();

    querySnapshot.forEach(doc => doc.ref.update({
        activo: false
    }));
}

export default async function runRaffle(req, res) {

    let tickets = await getTickets(req.body.raffleId);
    let {playerId, raffleId} = getRandomTicket(tickets);

    await updateAwardsWinner(raffleId, playerId, req.body.place);
    await disableTicket(playerId);

    res.json({
        payload: 1
    });
}