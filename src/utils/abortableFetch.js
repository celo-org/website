export default async function abortableFetch(url, options = {}) {
    return Promise.race([fetch(url, { ...options }), abort(url)]);
}
export async function abort(message, milliseconds = 3000) {
    return new Promise((_, reject) => setTimeout(() => {
        reject(new Error(`from abortableFetch: Took to Long to Fetch ${message}`));
    }, milliseconds));
}
//# sourceMappingURL=abortableFetch.js.map