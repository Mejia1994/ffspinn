import {playersCollection} from "../../../Server/Firebase/Firestore";
import firebase from "firebase-admin";

export default async function playVideoAdd(req, res) {

    try {
        let playerId = req.cookies.pid;

        await playersCollection.doc(playerId).update({
            credits: firebase.firestore.FieldValue.increment(3)
        });

        res.send({ok: true});

    } catch (e) {
        res.json({
            ok: false,
            payload: {message: 'Error inesperado', error: e.message}
        });
    }
}