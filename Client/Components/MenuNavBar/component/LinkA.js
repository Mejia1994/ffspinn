import Routes from "../util/Routes";
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";
import {Menu} from "semantic-ui-react";
import {useRouter} from 'next/router'

const LinkA = function () {

    let router = useRouter();
    let onClick = (path) => router.push(path).catch(err => console.error(err));

    return Routes.map(function (route) {

        let active = (router.pathname === route.path);

        return (
            <Responsive onClick={() => onClick(route.path)} active={active} key={route._id} as={Menu.Item}
                        minWidth={Responsive.onlyMobile.maxWidth}>
                {route.name}
            </Responsive>
        );
    });
}

export default LinkA;