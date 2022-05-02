import {onSnapshot, doc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {Firestore} from "../../../Client/Firebase";

const Awards = function ({raffle}) {

    const [awards, setAwards] = useState(raffle.awards);

    useEffect(function () {

        return onSnapshot(doc(Firestore, "raffles", raffle.id), (doc) => {
            setAwards(doc.data().awards);
        });

    }, [raffle.id]);

    return (
        <div className="nine wide column">
            <div className="ui statistic" style={{margin: 0}}>
                <label className="item" style={{color: 'gray'}}>
                    <i className="icon award"/>Premios
                </label>
            </div>

            {
                awards.map(function (award, index) {
                    return (
                        <div key={index} className="ui segment"
                             style={{display: "flex", justifyContent: 'space-between'}}>

                            <div className="ui statistic" style={{margin: 0}}>
                                <label className="item" style={{color: 'gray'}}>
                                    <i className="icon diamond"/>{award.award}
                                </label>
                            </div>

                            <div style={{fontWeight: 'bold'}}>{award.playerIdWinner}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Awards;