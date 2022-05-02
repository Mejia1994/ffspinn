import LinkA from "./component/LinkA";
import PlayerId from "./component/PlayerId";
import {Menu} from 'semantic-ui-react';
import IconBar from "./component/IconBar";
import {usePlayerState} from "../../State";

const MenuNavBar = function () {

    let playerState = usePlayerState();

    return (
        <Menu size="large">
            {playerState.playerId && <LinkA/>}
            {playerState.playerId && <PlayerId/>}
            {playerState.playerId && <IconBar/>}
        </Menu>
    )
}

export default MenuNavBar;