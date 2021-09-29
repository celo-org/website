import { RequestStatus, RequestType } from "src/fauceting/FaucetInterfaces";
export function validateBeneficary(addressOrE164, kind) {
    if (kind === RequestType.Invite) {
        return validateNumber(addressOrE164);
    }
    else {
        return validateAddress(addressOrE164);
    }
}
function validateNumber(number) {
    const E164RegEx = /^\+[1-9][0-9]{1,14}$/;
    return E164RegEx.test(number);
}
export const EXAMPLE_ADDRESS = "a0000aaa00a0000...a00a0a0000a00a00aa";
function validateAddress(address) {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
}
export function requestStatusToState(status) {
    switch (status) {
        case RequestStatus.Done:
            return RequestState.Completed;
        case RequestStatus.Failed:
            return RequestState.Failed;
        case RequestStatus.Working:
        case RequestStatus.Pending:
            return RequestState.Working;
    }
}
export var RequestState;
(function (RequestState) {
    RequestState[RequestState["Initial"] = 0] = "Initial";
    RequestState[RequestState["Invalid"] = 1] = "Invalid";
    RequestState[RequestState["Working"] = 2] = "Working";
    RequestState[RequestState["Completed"] = 3] = "Completed";
    RequestState[RequestState["Failed"] = 4] = "Failed";
})(RequestState || (RequestState = {}));
//# sourceMappingURL=utils.js.map