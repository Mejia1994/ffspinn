import {Dropdown, Menu} from "semantic-ui-react";
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";
import {useAppState} from "../../../State";

const IconBar = function () {

    const sideBarHandler = function () {
        let sidebarOpen = !useAppState.getState().sidebarOpen;
        useAppState.setState({sidebarOpen});
    }

    return (
        <Responsive as={Menu.Menu} maxWidth={Responsive.onlyMobile.maxWidth}>
            <Dropdown item icon='bars' onClick={sideBarHandler}/>
        </Responsive>
    );
}

export default IconBar;