import {useState} from "react";
import IpRoyalBanner from "../../Client/Components/IpRoyalBanner";
import GridContainer from "../../Client/Components/GridContainer";
import {useRouter} from "next/router";

const Login = function () {

    let router = useRouter();
    let [playerId, setPlayerId] = useState('');

    const idOnChange = function (e) {
        let value = e.target.value.trim();
        setPlayerId(value);
    }

    const checkPlayerId = function () {
        if (!Boolean(playerId)) {
            alert('Ingrese el Id de jugador.');
            throw new Error('Ingrese el Id de jugador.');
        }
    }

    const ingressOnClick = async function () {

        try {
            checkPlayerId();

            let response = await fetch('/api/session/login', {
                method: 'POST',
                body: JSON.stringify({playerId})
            });

            let data = await response.json();

            if (data.ok) {
               await router.push('/home');
            }

        } catch (e) {
            console.log("Error: ", e);
        }
    }

    return (
        <GridContainer>
            <IpRoyalBanner size="630"/>
            <div className="ui segment">
                <div className="ui form">
                    <div className="field content">
                        <h3 className='ui header'>Inicia sesión con tu ID de jugador</h3>
                        <div className="ui left input">
                            <input value={playerId} onChange={idOnChange} placeholder="ID de jugador"/>
                        </div>
                    </div>
                    <button className="ui primary button" onClick={ingressOnClick}>Ingresar</button>
                </div>
            </div>
        </GridContainer>
    )
}

export default Login;