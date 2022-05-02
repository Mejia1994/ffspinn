import {playersCollection} from "../../../Server/Firebase/Firestore";
import moment from "moment";
import firebase from "firebase-admin";

export default async function winDirectLink(req, res) {
    try {
        let playerId = req.cookies.pid;

        await playersCollection.doc(playerId).update({
            lastTryGoodLuck: moment(),
            credits: firebase.firestore.FieldValue.increment(1)
        });

        res.send({ok: true});
    } catch (e) {
        res.send({ok: false, error: e.message, message: "Error inesperado"});
    }
}