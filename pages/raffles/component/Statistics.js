import {usePlayerState} from "../../../Client/State";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {Firestore} from "../../../Client/Firebase";
import {useEffect, useState} from "react";

const Statistics = function ({raffle}) {

    const playerState = usePlayerState();
    const [state, setState] = useState({});

    useEffect(function () {

        let ticketsQuery = query(collection(Firestore, "tickets"), where("raffleId", "==", raffle.id));

        return onSnapshot(ticketsQuery, function (snapshot) {
            let yourTickets = [];
            let participants = [];

            snapshot.forEach(function (document) {
                if (document.data().playerId === playerState.playerId) yourTickets.push(document.data());
                if (participants.indexOf(document.data().playerId) === -1) participants.push(document.data().playerId);
            });

            setState({yourTickets: yourTickets.length, participants: participants.length});
        });

    }, [playerState.playerId, raffle.id]);

    return (
        <div className="six wide column">
            <div className="ui statistics small">
                <div className="ui statistic">
                    <label className="item" style={{color: 'gray'}}>
                        <i className="icon ticket"/>Tus Tickets
                    </label>
                    <div className="value" style={{textAlign: 'left'}}>{state.yourTickets ?? 0}</div>
                </div>

                <div className="ui statistic">
                    <label className="item" style={{color: 'gray'}}>
                        <i className="icon group"/>Participantes
                    </label>
                    <div className="value" style={{textAlign: 'left'}}>{state.participants ?? 0}</div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;