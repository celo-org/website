export function postForm(route, formData) {
    return fetch(route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
}
//# sourceMappingURL=postForm.jsx.map