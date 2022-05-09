import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import {playersCollection} from "../../../Server/Firebase/Firestore";
import moment from "moment";

const expiresInOneDay = 60 * 60 * 21200; // 1 days

const createToken = function (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresInOneDay //process.env.JWT_EXPIRES_IN
    }, null);
}

const createCookies = function (req, res, {name, value}, httpOnly = true) {
    let cookies = new Cookies(req, res);
    cookies.set(name, value, {httpOnly, maxAge: expiresInOneDay})
}

const loginPlayer = async function (playerId) {

    let player = await playersCollection.doc(playerId).get();

    if (!player.exists) {
        await playersCollection.doc(playerId).set({
            playerId: Number(playerId),
            credits: 10,
            lastTryGoodLuck: moment().subtract(1, 'days').toDate(),
        });
    }
};

export default async function login(req, res) {

    try {
        let {playerId} = JSON.parse(req.body);

        await loginPlayer(playerId);

        createCookies(req, res, {name: 'pid', value: playerId}, false);
        createCookies(req, res, {name: 'token', value: createToken({playerId})});

        res.json({ok: true, message: 'Login successful'});
    } catch (e) {
        res.status(200).json({ok: false, error: e.message});
    }
}
