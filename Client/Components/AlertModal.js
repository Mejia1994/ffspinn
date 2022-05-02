import {Button, Modal} from "semantic-ui-react";
import {useAlertModalState} from "../State";

const AlertModal = function () {

    let state = useAlertModalState();

    return (
        <Modal size='small' open={state.open}>
            <Modal.Header>
                {state.title}
            </Modal.Header>
            <Modal.Content>
                <p className="ui header">
                    {state.message}
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={state.onAccept}>
                    Aceptar
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default AlertModal;