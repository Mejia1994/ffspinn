import {useEffect, useState} from "react";
import {useRaffleState} from "../../Client/State";
import GridContainer from "../../Client/Components/GridContainer";
import Raffle from "./component/Raffle";
import {Firestore} from "../../Client/Firebase";
import {collection, onSnapshot} from "firebase/firestore";
import moment from "moment";

const Raffles = function () {

    const state = useRaffleState();

    useEffect(function () {

        return onSnapshot(collection(Firestore, "raffles"), (querySnapshot) => {
            let raffles = [];
            querySnapshot.forEach(doc => raffles.push({
                id: doc.id,
                ...doc.data(),
                isExpired: moment(doc.data().date.toDate()).isBefore(moment()),
            }));

            useRaffleState.setState({raffles: [...raffles]});
        });

    }, []);


    return (
        <GridContainer>
            {
                state.raffles.map(function (raffle, index) {
                    return <Raffle key={index} state={raffle}/>
                })
            }
        </GridContainer>
    )
}

export default Raffles;