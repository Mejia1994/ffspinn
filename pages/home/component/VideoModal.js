import {useEffect} from "react";
import {Modal} from "semantic-ui-react";

const VideoModal = function (props) {

    useEffect(function () {
        const player = new window.VASTPlayer(document.getElementById('container'));

        player.on("AdStopped", props.onstop);

        player.load("https://www.videosprofitnetwork.com/watch.xml?key=4ed6e6d81d7dbf81dffd92e611b147ee").then(function startAd() {
            return player.startAd();
        });
    });

    return <Modal size='small' open={true} id="container"/>;
}

export default VideoModal;