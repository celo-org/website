import { BigNumber } from "bignumber.js";
import { styles } from "src/dev/ValidatorsListStyles";
import { weiToDecimal } from "src/utils/utils";
export const localStoragePinnedKey = "pinnedValidators";
export const orderAccessors = {
    order: (_) => _.order,
    name: (_) => (_.name || "").toLowerCase() || null,
    total: (_) => _.numMembers * 1000 + _.elected,
    votes: (_) => +_.votesAbsolute || 0,
    rawVotes: (_) => _.votesRaw || 0,
    votesAvailables: (_) => _.receivableRaw || 0,
    celo: (_) => _.celo || 0,
    commission: (_) => _.commission || 0,
    rewards: (_) => _.rewards || 0,
    uptime: (_) => _.uptime || 0,
    attestation: (_) => _.attestation || 0,
};
export function isPinned(address) {
    const list = (localStorage.getItem(localStoragePinnedKey) || "").split(",") || [];
    return +list.includes(address);
}
export function togglePin(address) {
    let list = (localStorage.getItem(localStoragePinnedKey) || "").split(",") || [];
    const pinned = list.includes(address);
    if (!pinned) {
        list.push(address);
    }
    else {
        list = list.filter((_) => _ !== address);
    }
    localStorage.setItem(localStoragePinnedKey, list.join(","));
}
export function cleanData({ celoValidatorGroups, latestBlock }) {
    const totalVotes = celoValidatorGroups
        .map(({ receivableVotes }) => new BigNumber(receivableVotes))
        .reduce((acc, _) => acc.plus(_), new BigNumber(0));
    const getClaims = (claims = {}) => (claims.edges || [])
        .map(({ node }) => node)
        .filter(({ verified }) => verified)
        .map(({ element }) => element);
    return celoValidatorGroups
        .map(({ account, affiliates, votes, receivableVotes, commission, numMembers, rewardsRatio }) => {
        const rewards = rewardsRatio === null ? null : Math.round(+rewardsRatio * 100 * 10) / 10;
        const rewardsStyle = rewards < 70 ? styles.barKo : rewards < 90 ? styles.barWarn : styles.barOk;
        const receivableVotesPer = new BigNumber(receivableVotes)
            .dividedBy(totalVotes)
            .multipliedBy(100);
        const votesPer = new BigNumber(votes).dividedBy(receivableVotes).multipliedBy(100);
        const votesAbsolutePer = receivableVotesPer.multipliedBy(votesPer).dividedBy(100);
        const totalFulfilled = affiliates.edges.reduce((acc, obj) => {
            return acc + (obj.node.attestationsFulfilled || 0);
        }, 0);
        const totalRequested = affiliates.edges.reduce((acc, obj) => {
            return acc + (obj.node.attestationsRequested || 0);
        }, 0);
        return {
            attestation: Math.max(0, totalFulfilled / (totalRequested || -1)) * 100,
            order: Math.random(),
            pinned: isPinned(account.address),
            name: account.name,
            address: account.address,
            usd: weiToDecimal(+account.usd),
            celo: weiToDecimal(+account.lockedGold),
            receivableRaw: weiToDecimal(+receivableVotes),
            receivableVotes: receivableVotesPer.toString(),
            votesRaw: weiToDecimal(+votes),
            votes: votesPer.toString(),
            votesAbsolute: votesAbsolutePer.toString(),
            commission: (+commission * 100) / 10 ** 24,
            rewards,
            rewardsStyle,
            numMembers,
            claims: getClaims(account.claims),
            validators: affiliates.edges.map(({ node: validator }) => {
                const { address, lastElected, lastOnline, name, usd, lockedGold, score, attestationsFulfilled, attestationsRequested, } = validator;
                return {
                    name,
                    address,
                    usd: weiToDecimal(+usd),
                    celo: weiToDecimal(+lockedGold),
                    elected: lastElected >= latestBlock,
                    online: lastOnline >= latestBlock,
                    uptime: (+score * 100) / 10 ** 24,
                    attestation: Math.max(0, attestationsFulfilled / (attestationsRequested || -1)) * 100,
                    neverElected: !lastElected && !attestationsRequested,
                    claims: getClaims(validator.account.claims),
                };
            }),
        };
    })
        .map((group, id) => {
        const data = group.validators.reduce(({ elected, online, total, uptime }, validator) => ({
            elected: elected + +validator.elected,
            online: online + +validator.online,
            total: total + 1,
            uptime: uptime + validator.uptime,
        }), { elected: 0, online: 0, total: 0, uptime: 0 });
        data.uptime = data.uptime / group.validators.length;
        return {
            id,
            ...group,
            ...data,
        };
    });
}
export function sortData(data, asc, key) {
    const accessor = orderAccessors[key];
    const dir = asc ? 1 : -1;
    const compare = (a, b) => {
        if (a === null) {
            return 1;
        }
        if (b === null) {
            return -1;
        }
        return a > b ? 1 : -1;
    };
    return data
        .sort((a, b) => dir * compare(accessor(a), accessor(b)))
        .sort((a, b) => isPinned(b.address) - isPinned(a.address));
}
//# sourceMappingURL=validators.js.map