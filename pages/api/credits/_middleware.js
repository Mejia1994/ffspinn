import {middlewareWithAuthentication} from "../../_middleware";
import {NextResponse} from "next/server";

export default async function handler(req) {

    try {

        const VerifiedMethod = function () {

            return new Promise((resolve, reject) => {
                if (req.method !== 'POST') {
                    return reject({message: 'Petición no permitida'});
                }

                return resolve(middlewareWithAuthentication)
            })
        }

        await VerifiedMethod();
    } catch (e) {
        return new Response(e.message)
    }
}