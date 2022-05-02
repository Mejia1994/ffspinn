import {usePlayerState} from "../../../State";
import {Dropdown, Menu} from "semantic-ui-react";
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";
import {useRouter} from "next/router";

const PlayerId = function () {

    let router = useRouter();
    let playerState = usePlayerState();

    const onLogout = function () {
        fetch("/api/session/logout").then(async function () {
            await router.push('/login');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Responsive position='right' as={Menu.Menu} minWidth={Responsive.onlyMobile.maxWidth}>
            <Dropdown item text={playerState.playerId}>
                <Dropdown.Menu>
                    <Dropdown.Item text='Salir' onClick={onLogout}/>
                </Dropdown.Menu>
            </Dropdown>
        </Responsive>
    )
}

export default PlayerId;