import JoinPage from "src/join/JoinPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.jobs])),
        },
    };
}
export default JoinPage;
//# sourceMappingURL=jobs.jsx.map