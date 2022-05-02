import '../styles/globals.css';
import '/semantic/dist/semantic.min.css';
import React, {useEffect} from 'react';
import {Menu, Sidebar} from 'semantic-ui-react'
import {useAppState, usePlayerState} from "../Client/State";
import SidebarItem from "../Client/Components/MenuNavBar/component/SidebarItem";
import Head from 'next/head';
import AlertModal from "../Client/Components/AlertModal";
import Loading from "../Client/Components/Loading";
import MenuNavBar from "../Client/Components/MenuNavBar/index.";
import Script from 'next/script'
import "/public/vast/videojs.vast.vpaid.min.css"

function MyApp({Component, pageProps}) {

    let {sidebarOpen, appName} = useAppState(state => state);

    useEffect(function () {
        usePlayerState.getState().updatePlayerId();
    });

    return (
        <>
            <Head>
                <title>{appName}</title>
            </Head>

            <Script type='text/javascript'
                    src='https://synchronizerobot.com/67/dc/aa/67dcaa5c4ce2ad5dc22d694236e7dd69.js'></Script>

            <Script type='text/javascript'
                    strategy="beforeInteractive"
                    src="https://cdn.jsdelivr.net/npm/vast-player@0.2/dist/vast-player.min.js"></Script>

            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    onHide={() => useAppState.setState({sidebarOpen: false})}
                    vertical
                    visible={sidebarOpen}
                    width='thin'>
                    <SidebarItem/>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpen}
                                style={{minHeight: '100vh', display: 'flex', flexFlow: 'column nowrap'}}>

                    <MenuNavBar/>
                    <Loading/>
                    <AlertModal/>
                    <Component {...pageProps} />

                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    )
}

export default MyApp
