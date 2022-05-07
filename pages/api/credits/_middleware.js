import {middlewareWithAuthentication} from "../../_middleware";

export default async function _middleware(req) {

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