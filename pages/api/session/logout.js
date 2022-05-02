import Cookies from "cookies";

const unsetCookies = function (req, res) {
    let cookies = new Cookies(req, res);

    cookies.set("pid", null, {httpOnly: true, maxAge: Date.now()})
    cookies.set("token", null, {httpOnly: true, maxAge: Date.now()})
}

export default function logout(req, res) {
    unsetCookies(req, res);
    res.status(200).send({message: "Logout successful"});
}