import getConfig from "next/config";
import Sentry from "../server/sentry";
var ListStatus;
(function (ListStatus) {
    ListStatus[ListStatus["subscribe"] = 1] = "subscribe";
    ListStatus[ListStatus["unsubscribe"] = 2] = "unsubscribe";
})(ListStatus || (ListStatus = {}));
function apiKey() {
    const { serverRuntimeConfig } = getConfig();
    return serverRuntimeConfig.__ACTIVE_CAMPAIGN_API_KEY__;
}
const BASE_URL = "https://celo.api-us1.com/api/3";
async function upsertContact(contact) {
    const response = await fetch(`${BASE_URL}/contact/sync`, buildRequest({ contact }));
    return processResponse(response);
}
async function addToList(contactList) {
    const response = await fetch(`${BASE_URL}/contactLists`, buildRequest({ contactList }));
    return processResponse(response);
}
async function createContactFieldValue(fieldValue) {
    const response = await fetch(`${BASE_URL}/fieldValues`, buildRequest({ fieldValue }));
    return processResponse(response);
}
async function processResponse(response) {
    if (response.ok) {
        const json = await response.json();
        return json;
    }
    const error = await response.json();
    console.info("active-campaign-error", error);
    throw { status: response.statusText, error: error.errors };
}
function buildRequest(body) {
    return {
        headers: {
            "Api-Token": apiKey(),
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
    };
}
function convert(formContact) {
    const [firstName, ...restNames] = formContact.fullName.split(" ");
    const lastName = restNames.join(" ");
    return {
        email: formContact.email,
        firstName,
        lastName,
        deleted: false,
    };
}
const CUSTOM_FIELD_IDS = {
    interest: 16,
    company: 12,
    role: 4,
    source: 1,
};
async function setCustomFields(contactID, fields) {
    await Promise.all(Object.keys(fields).map(async (key) => {
        const value = fields[key];
        if (value) {
            await createContactFieldValue({
                contact: contactID,
                field: CUSTOM_FIELD_IDS[key],
                value,
            });
        }
    }));
}
const NEWSLETTER_LIST = 1;
export default async function addToCRM({ email, fullName, interest, company, role, list = NEWSLETTER_LIST, }) {
    const preparedContact = convert({ email, fullName });
    try {
        const contact = await upsertContact(preparedContact);
        const contactID = Number(contact.contact.id);
        await Promise.all([
            addToList({ contact: contactID, list, status: ListStatus.subscribe }),
            setCustomFields(contactID, { interest, company, role, source: "website" }),
        ]);
        return contact;
    }
    catch (e) {
        Sentry.withScope((scope) => {
            scope.setTag("Service", "ActiveCampaign");
            Sentry.captureEvent({ message: e.toString(), extra: { status: e.status } });
        });
        return { error: e };
    }
}
//# sourceMappingURL=addToCRM.js.map