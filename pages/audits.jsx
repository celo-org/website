import Audits from "src/terms/Audits";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.audits])),
        },
    };
}
export default Audits;
//# sourceMappingURL=audits.jsx.map