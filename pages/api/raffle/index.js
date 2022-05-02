import {rafflesCollection, ticketsCollection} from "../../../Server/Firebase/Firestore";
import moment from "moment";

const optionDate = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};

const getStatistics = async function (playerId, raffleId) {

    let snapshot = await ticketsCollection.where('raffleId', '==', raffleId).get();

    let participants = snapshot.docs.reduce((acc, doc) => {
        let ticket = doc.data();

        if (!acc.includes(ticket.playerId)) {
            acc.push(ticket.playerId);
        }
        return acc;
    }, []);


    return {
        participants: participants.length,
        yourTickets: snapshot.docs.filter(doc => doc.data().playerId === playerId).length,
    };
};

export default async function raffle(req, res) {
    try {
        let playerId = req.cookies.pid;
        let snapshot = await rafflesCollection.get();

        let raffles = await Promise.all(

            snapshot.docs.map(async doc => {

                let {participants, yourTickets} = await getStatistics(playerId, doc.id);

                return {
                    id: doc.id,
                    ...doc.data(),
                    yourTickets,
                    participants,
                    isExpired: moment(doc.data().date.toDate()).isBefore(moment()),
                    date: doc.data().date.toDate().toLocaleDateString('es-es', optionDate).toUpperCase(),
                }
            })
        );

        res.json({ok: true, payload: {raffles}});
    } catch (e) {
        res.json({ok: false, payload: {error: e.message, message: "Error inesperado"}});
    }
}
