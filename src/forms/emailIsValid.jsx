export function emailIsValid(email) {
    return email && email.length && email.length < 254 && email.indexOf("@") > 0;
}
export function urlIsValid(url) {
    return /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(url);
}
export function hasField(value) {
    return value && value.trim().length > 0;
}
//# sourceMappingURL=emailIsValid.jsx.map