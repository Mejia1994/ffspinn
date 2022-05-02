import Credits from "./component/Credits";
import LuckyButton from "./component/LuckyButton";
import GridContainer from "../../Client/Components/GridContainer";
import {useDirectLinkState} from "../../Client/State";
import VideoModal from "./component/VideoModal";
import {useState} from "react";

export default function Home() {

    const [videoModalOpen, setVideoModalOpen] = useState(false);

    const generateNewLink = async function () {
        try {
            window.open(useDirectLinkState.getState().getDirectLink(), "_blank");

            let response = await fetch("/api/credits/winDirectLink", {method: "POST"});
            let {ok, message} = await response.json();

            if (!ok) alert(message);

        } catch (e) {
            alert("Error inesperado.");
        }
    }

    const onCloseVideoModal = async function () {

        try {
            setVideoModalOpen(false);

            let response = await fetch("/api/credits/playVideoAdd", {method: "POST"});
            let {ok, message} = await response.json();

            if (!ok) alert(message);
        } catch (e) {
            alert("Error inesperado.");
        }
    }

    return (
        <>
            <GridContainer>
                <div className="ui segment">
                    <Credits/>
                    <div className='ui divider hidden'/>
                    <div className='ui divider hidden'/>
                    <LuckyButton/>
                </div>
            </GridContainer>

            <GridContainer>
                <h3 className="ui header">Créditos GRATIS para poder participar en rifas.</h3>
                <div className="ui segment" style={{cursor: "pointer"}} onClick={generateNewLink}>
                    <h3 className='ui header'>
                        <i className="icon external circle alternate"></i> Gana 1¢
                    </h3>
                </div>

                <div className="ui segment" style={{cursor: "pointer"}} onClick={() => setVideoModalOpen(true)}>
                    <h3 className='ui header'>
                        <i className="icon play circle outline"></i> Gana 3¢
                    </h3>
                </div>

                {
                    videoModalOpen && <VideoModal onstop={onCloseVideoModal}/>
                }
            </GridContainer>
        </>
    )
}
