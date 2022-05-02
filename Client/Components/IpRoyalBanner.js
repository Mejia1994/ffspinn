const IpRoyalBanner = function (prop) {

    return (
        <a href="https://iproyal.com/pawns?r=524000" target="_blank" rel="noreferrer">
            <img className="ad" src={`https://pawns.iproyal.com/img/b/${prop.size}.jpg`} alt="$1 dollar"/>
        </a>
    );
}

export default IpRoyalBanner;