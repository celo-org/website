import Landing from "src/coinbase-earn/Landing";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.cbe])),
        },
    };
}
export default Landing;
//# sourceMappingURL=coinbase-earn.jsx.map