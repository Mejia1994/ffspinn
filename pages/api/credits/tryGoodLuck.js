import moment from "moment";
import {playersCollection} from "../../../Server/Firebase/Firestore";

const firebase = require("firebase-admin");

const getLastTryGoodLuck = async function (playerId) {
    let player = await playersCollection.doc(playerId).get();
    let {lastTryGoodLuck} = player.data();

    return moment(lastTryGoodLuck.toDate());
}

const hasPast24Hours = function (now, lastTryGoodLuck) {
    return now.diff(lastTryGoodLuck, 'seconds') > 86400;
}

const timeToNextTry = function (now, lastTryGoodLuck) {
    return moment.duration(now.diff(lastTryGoodLuck, 'seconds') - 86400, 'seconds');
}

export default async function tryGoodLuck(req, res) {

    let playerId = req.cookies.pid;
    let lastTryGoodLuck = await getLastTryGoodLuck(playerId);

    if (hasPast24Hours(moment(), lastTryGoodLuck)) {
        let credits = Math.floor(Math.random() * (10 - 1) + 1);

        await playersCollection.doc(playerId).update({
            lastTryGoodLuck: moment(),
            credits: firebase.firestore.FieldValue.increment(credits)
        });

        res.json({ok: true, payload: {message: `You have won ${credits} credits!`}});
    } else {

        let timeToWait = timeToNextTry(moment(), lastTryGoodLuck);

        res.json({
            ok: true,
            payload: {message: `Tienes que esperar ${Math.abs(timeToWait.hours())} horas y ${Math.abs(timeToWait.minutes())} minutos para volver a intentarlo.`}
        });
    }
}