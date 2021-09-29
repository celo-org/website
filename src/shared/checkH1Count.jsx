export function checkH1Count() {
    setTimeout(() => {
        if (document.getElementsByTagName("h1").length > 1) {
            console.warn("To many h1 tags on page. This decreases search rank, please limit to 1 per page", Array.from(document.getElementsByTagName("h1")).map((el) => el.innerText));
        }
    }, 500);
}
//# sourceMappingURL=checkH1Count.jsx.map