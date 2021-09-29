import flavor from "src/experience/eventkit/FlavorPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common])),
        },
    };
}
export default flavor;
//# sourceMappingURL=flavor.jsx.map