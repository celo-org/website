import NetworkSpeed from "network-speed";
import { Clipboard } from "react-native";
export function randomIntegerInRange(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}
export function scrollTo(elementID, position) {
    const element = document.getElementById(elementID);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: position,
            inline: position,
        });
    }
}
export async function getNetworkDownloadSpeed() {
    try {
        const testNetworkSpeed = new NetworkSpeed();
        const byteSize = 300;
        const baseUrl = `/api/bytes`;
        const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, byteSize);
        return speed;
    }
    catch (e) {
        return { mbps: "0", kbps: "0", bps: "0" };
    }
}
const MIN_MB_FOR_FAST = 5;
async function isFast(speed) {
    if (speed === EffectiveTypes["4g"]) {
        return true;
    }
    if (typeof speed === "number" && speed > MIN_MB_FOR_FAST) {
        return true;
    }
    return false;
}
export function getEffectiveConnection(navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return (connection && connection.effectiveType) || "unknown";
}
export var EffectiveTypes;
(function (EffectiveTypes) {
    EffectiveTypes["2g"] = "2g";
    EffectiveTypes["3g"] = "3g";
    EffectiveTypes["4g"] = "4g";
    EffectiveTypes["slow-2g"] = "slow-2g";
    EffectiveTypes["unknown"] = "unknown";
})(EffectiveTypes || (EffectiveTypes = {}));
export async function hasGoodConnection() {
    const chromesBuiltInMethod = getEffectiveConnection(window.navigator);
    if (chromesBuiltInMethod !== "unknown") {
        return isFast(chromesBuiltInMethod);
    }
    return Promise.race([multiPartCheck(), abort()]);
}
async function multiPartCheck() {
    const multiPart = await Promise.all([getNetworkDownloadSpeed(), getNetworkDownloadSpeed()]);
    const averageSpeed = multiPart
        .map((speeds) => speeds.mbps)
        .reduce((previous, current) => {
        return Number(previous) + Number(current);
    }, 0) / multiPart.length;
    return isFast(averageSpeed);
}
const MAX_TIME_MS = 1000;
async function abort() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, MAX_TIME_MS);
    });
}
export function getDeviceMemory() {
    return navigator.deviceMemory || 4;
}
export function isBrowser() {
    return process.browser;
}
export function cutAddress(address) {
    return address.toUpperCase().replace(/^0x([a-f0-9]{4}).+([a-f0-9]{4})$/i, "0x$1...$2");
}
export function formatNumber(n, decimals = 2) {
    if (n === Infinity) {
        return undefined;
    }
    return isNaN(+n)
        ? (0).toFixed(decimals)
        : (+n).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function copyToClipboad(text) {
    Clipboard.setString(text);
}
export function weiToDecimal(number) {
    return number / 10 ** 18;
}
export function isExternalLink(link) {
    return link.startsWith("http");
}
//# sourceMappingURL=utils.js.map