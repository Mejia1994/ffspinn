import {rafflesCollection} from "../../../Server/Firebase/Firestore";
import moment from "moment/moment";

export default async function createRaffle(req, res) {

    await rafflesCollection.doc().set({
        ticketPrice: 10,
        date: moment().add(1, 'days').toDate(),
        facebookLink: 'https://www.facebook.com/',
        awards: [
            {
                award: "500",
                place: 1,
                playerIdWinner: null
            }, {
                award: "100",
                place: 2,
                playerIdWinner: null
            }
        ]
    });

    res.send({
        status: "ok"
    });
}