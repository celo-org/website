import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import getConfig from "next/config";
import Sentry from "../server/sentry";
import { NETWORK, RequestStatus, } from "../src/fauceting/FaucetInterfaces";
async function getFirebase() {
    if (!firebase.apps.length) {
        const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
        firebase.initializeApp(publicRuntimeConfig.FIREBASE_CONFIG);
        const loginUsername = serverRuntimeConfig.FIREBASE_LOGIN_USERNAME;
        const loginPassword = serverRuntimeConfig.FIREBASE_LOGIN_PASSWORD;
        if (loginUsername === undefined || loginUsername === null || loginUsername.length === 0) {
            throw new Error("Login username is empty");
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(loginUsername, loginPassword);
        }
        catch (e) {
            Sentry.withScope((scope) => {
                scope.setTag("Service", "Firebase");
                Sentry.captureException(e);
            });
            console.error(`Fail to login into Firebase: ${e}`);
            throw e;
        }
    }
    return firebase;
}
async function getDB() {
    return (await getFirebase()).database();
}
export async function sendRequest(beneficiary, type, mobileOS) {
    const newRequest = {
        beneficiary,
        status: RequestStatus.Pending,
        type,
    };
    if (mobileOS) {
        newRequest.mobileOS = mobileOS;
    }
    try {
        const db = await getDB();
        const ref = await db.ref(`${NETWORK}/requests`).push(newRequest);
        return ref.key;
    }
    catch (e) {
        Sentry.withScope((scope) => {
            scope.setTag("Service", "Firebase");
            Sentry.captureException(e);
        });
        console.error(`Error while sendRequest: ${e}`);
        throw e;
    }
}
//# sourceMappingURL=FirebaseServerSide.js.map