import {NextResponse} from 'next/server'
/*import jwt from "jsonwebtoken";*/

const redirectToLogin = function (req) {
    return NextResponse.redirect(new URL('/login', req.url))
}

const redirectToHome = function (req) {
    return NextResponse.redirect(new URL('/home', req.url))
}

const verifyToken = function (token) {
   /* return jwt.verify(token, "process.env.JWT_SECRET", null, (err, decoded) => {
        if (err) return {hasError: true, payload: err};
        else return {hasError: false, payload: decoded};
    });*/
}

export const middlewareWithAuthentication = function (req) {

    /*let token = verifyToken(req.cookies?.token);

    if (token.hasError) {
        return redirectToLogin(req);
    }
*/
    return NextResponse.next();
}

export const middlewareWithOutAuthentication = function (req) {

    /*let token = verifyToken(req.cookies?.token);

    if (!token.hasError) {
        return redirectToHome(req);
    }*/

    return NextResponse.next();
}

export default function _middleware() {
    return NextResponse.next();
}