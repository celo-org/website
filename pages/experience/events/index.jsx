import Intro from "src/experience/eventkit/Intro";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common])),
        },
    };
}
export default Intro;
//# sourceMappingURL=index.jsx.map