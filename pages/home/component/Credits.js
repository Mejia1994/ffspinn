import {doc, onSnapshot} from "firebase/firestore";
import {Firestore} from "../../../Client/Firebase";
import {usePlayerState} from "../../../Client/State";
import {useEffect} from "react";

const Credits = function () {

    const playerState = usePlayerState()

    useEffect(function () {

        return playerState.playerId && onSnapshot(doc(Firestore, "players", playerState.playerId), (doc) => {
            usePlayerState.setState({credits: doc.data().credits})
        });

    }, [playerState.playerId])

    return (
        <div className="ui form">
            <div className="field content">
                <h3 className='ui header' style={{marginBottom: '0.1rem'}}>Total de créditos</h3>
            </div>
            <div className="ui statistics small">
                <div className="ui statistic">
                    <div className="value">{playerState.credits}<small className="floating right">¢</small></div>
                </div>
            </div>
        </div>
    )
}

export default Credits;