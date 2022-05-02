import Routes from "../util/Routes";
import {useRouter} from "next/router";
import {Dropdown, Menu} from "semantic-ui-react";
import {useAppState, usePlayerState} from "../../../State";

const SidebarItem = function () {

    const state = usePlayerState((state) => state);
    const router = useRouter();
    const onClick = function (path) {
        router.push(path).then(_ => useAppState.setState({sidebarOpen: false}));
    };

    const onLogout = function () {
        fetch("/api/session/logout").then(async function () {
            await router.push('/home');

            useAppState.setState({sidebarOpen: false})
            usePlayerState.setState({playerId: null});
        }).catch(function (error) {
            console.log(error);
        });
    }

    let ItemMenu = Routes.map(function (route) {
        let active = (router.pathname === route.path);
        return <Menu.Item onClick={() => onClick(route.path)} active={active} key={route._id} as='a' name={route.name}/>
    });

    return (
        <>
            <Dropdown.Item>
                <Dropdown text={state.playerId}>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Salir' onClick={onLogout}/>
                    </Dropdown.Menu>
                </Dropdown>
            </Dropdown.Item>
            {ItemMenu}
        </>
    );
}


export default SidebarItem;