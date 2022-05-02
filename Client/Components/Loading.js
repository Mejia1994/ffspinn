import {Dimmer, Loader} from "semantic-ui-react";
import {useLoadingState} from "../State";

const Loading = function () {

    let state = useLoadingState();

    return (
        <Dimmer active={state.active}>
            <Loader active={state.active}>
                <h3 className="ui header" style={{color: "white"}}>{state.title}</h3>
            </Loader>
        </Dimmer>
    );
}

export default Loading;