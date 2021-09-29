import Logo from "src/experience/brandkit/Logo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.brand])),
        },
    };
}
export default Logo;
//# sourceMappingURL=logo.jsx.map