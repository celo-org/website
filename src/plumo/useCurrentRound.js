import React from "react";
import useSWR from "swr";
async function fetcher(url) {
    const response = await fetch(url);
    return response.json();
}
const URL = "https://plumo-setup-phase-2.azurefd.net/ceremony";
export default function useCurrentRound() {
    const { data } = useSWR(URL, fetcher);
    const status = data?.status;
    const result = data?.result;
    return React.useMemo(() => processData(status, result), [status, result]);
}
function processData(status, result) {
    const processeed = {
        loading: true,
        round: 0,
        chunkCount: 0,
        participantIds: [],
        progressCompleted: {},
        progress: {},
    };
    if (status !== "ok") {
        return processeed;
    }
    processeed.round = result.round;
    processeed.chunkCount = result.chunks.length;
    processeed.participantIds = result.contributorIds;
    processeed.participantIds.forEach((participantId) => {
        processeed.progress[participantId] = result.chunks.reduce((accumulator, currentValue) => {
            return (accumulator +
                currentValue.contributions.reduce((accumulator, currentValue) => {
                    if (currentValue.contributorId == participantId && currentValue.verified) {
                        return accumulator + 1;
                    }
                    else {
                        return accumulator + 0;
                    }
                }, 0));
        }, 0);
        processeed.progressCompleted[participantId] = result.chunks.reduce((accumulator, currentValue) => {
            return (accumulator +
                currentValue.contributions.reduce((accumulator, currentValue) => {
                    if (currentValue.contributorId == participantId) {
                        return accumulator + 1;
                    }
                    else {
                        return accumulator + 0;
                    }
                }, 0));
        }, 0);
    });
    processeed.loading = false;
    return processeed;
}
//# sourceMappingURL=useCurrentRound.js.map