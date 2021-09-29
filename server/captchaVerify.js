import getConfig from "next/config";
const CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";
var Errors;
(function (Errors) {
    Errors["MissingSecret"] = "missing-input-secret";
    Errors["InvalidSecret"] = "invalid-input-secret";
    Errors["MissingResponse"] = "missing-input-response";
    Errors["InvalidResponse"] = "invalid-input-response";
    Errors["BadRequest"] = "bad-request";
    Errors["Timeout"] = "timeout-or-duplicate";
})(Errors || (Errors = {}));
export default async function captchaVerify(captchaToken) {
    const result = await fetch(CAPTCHA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(getConfig().serverRuntimeConfig.RECAPTCHA_SECRET)}&response=${encodeURIComponent(captchaToken)}`,
    });
    return result.json();
}
//# sourceMappingURL=captchaVerify.js.map