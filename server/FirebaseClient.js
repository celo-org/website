import firebase from "firebase/app";
import "firebase/database";
import getConfig from "next/config";
import { NETWORK, RequestStatus } from "../src/fauceting/FaucetInterfaces";
async function getFirebase() {
    if (!firebase.apps.length) {
        const { publicRuntimeConfig } = getConfig();
        firebase.initializeApp(publicRuntimeConfig.FIREBASE_CONFIG);
    }
    return firebase;
}
async function getDB() {
    return (await getFirebase()).database();
}
export default async function subscribeRequest(key, onChange) {
    const ref = (await getDB()).ref(`${NETWORK}/requests/${key}`);
    const listener = ref.on("value", (snap) => {
        const record = snap.val();
        if (record) {
            onChange(record);
        }
        if (record.status === RequestStatus.Done || record.status === RequestStatus.Failed) {
            ref.off("value", listener);
        }
    });
}
//# sourceMappingURL=FirebaseClient.js.map