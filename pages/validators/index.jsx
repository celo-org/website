import ValidatorPage from "src/dev/ValidatorPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.dev])),
        },
    };
}
export default ValidatorPage;
//# sourceMappingURL=index.jsx.map