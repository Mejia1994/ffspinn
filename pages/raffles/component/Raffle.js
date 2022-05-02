import {Button, Segment} from "semantic-ui-react";
import {useState} from "react";
import {useAlertModalState} from "../../../Client/State";
import Statistics from "./Statistics";
import Awards from "./Awards";

const Raffle = function ({state}) {

    const optionDate = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    const [fetching, setFetching] = useState(false);

    const buyTickets = async function () {
        try {
            setFetching(true);

            let response = await fetch(`/api/raffle/buyTickets?raffleId=${state.id}`);
            let {ok, payload} = await response.json();

            if (!ok) {
                useAlertModalState.setState({open: true, message: payload.message});
            }

            setFetching(false);
        } catch (e) {
            console.log(e);
            alert('Error inesperado');
        }
    };

    return (
        <Segment raised>
            <div
                className={`ui top attached label ${state.isExpired ? "disabled" : "primary"} primary raffle-header`}>
                <h4 className="ui header"
                    style={{color: 'white'}}>{state.date.toDate().toLocaleDateString('es-es', optionDate).toUpperCase()}</h4>
            </div>

            <div className="ui stackable grid">
                <Statistics raffle={state}/>
                <Awards raffle={state}/>
            </div>

            <div className='ui divider hidden'/>
            <div className="ui labeled button" tabIndex="0">
                <Button
                    loading={fetching}
                    disabled={fetching || state.isExpired}
                    onClick={buyTickets}
                    className="primary"
                    content='Comprar Ticket'
                    icon='ticket'
                    label={{as: 'a', basic: true, content: `${state.ticketPrice} ¢`}}
                    labelPosition='right'
                />
            </div>

            <a className="ui gray right corner label" target="_blank" href={state.ownerLink} rel="noreferrer"
               noreferrer>
                <i className="facebook blue square icon"></i>
            </a>
        </Segment>
    )
}

export default Raffle;