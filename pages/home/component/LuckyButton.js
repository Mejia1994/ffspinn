import {Button} from "semantic-ui-react";
import {useAlertModalState} from "../../../Client/State";

const LuckyButton = function () {

    const tryYourLuck = async function () {

        try {
            let response = await fetch('/api/credits/tryGoodLuck', {
                method: 'POST',
            });

            let {ok, payload} = await response.json();

            if (ok) {
                useAlertModalState.setState({open: true, message: payload.message});
            }
        } catch (e) {
            alert("Error inesperado.");
        }
    };

    return (
        <div>
            <h5 className="ui header">Prueba tu suerte cada día y podrás ganar créditos.</h5>
            <Button
                onClick={tryYourLuck}
                loading={false}
                disabled={false}
                className="primary"
                content='Probar suerte'
            />
        </div>
    );
}

export default LuckyButton;