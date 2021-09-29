export default async function gatherAllies(persistFunc, signal) {
    const response = await fetch("api/alliance");
    const alliesByCategory = await response.json();
    if (!signal.aborted) {
        persistFunc(alliesByCategory);
    }
}
//# sourceMappingURL=gatherAllies.jsx.map