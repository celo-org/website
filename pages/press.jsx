import Papers from "src/press/PressPage";
import makeSafeForJson from "src/utils/makeSafeForJson";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps(context) {
    const getPress = await import("src/../server/fetchPress");
    const press = await getPress.default();
    const languages = context.req.headers["accept-language"]
        ?.toLowerCase()
        ?.split(",")
        ?.map((s) => s.substr(0, 2)) || defaultLang;
    return {
        props: makeSafeForJson({
            languages,
            press,
            ...(await serverSideTranslations(context.locale, [NameSpaces.common, NameSpaces.press])),
        }),
    };
}
const defaultLang = ["en"];
export default Papers;
//# sourceMappingURL=press.jsx.map