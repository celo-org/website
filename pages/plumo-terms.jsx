import Agreement from "src/terms/Agreement";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps({ locale }) {
    const getPageBySlug = await import("src/utils/contentful").then((mod) => mod.getPageBySlug);
    const pageData = await getPageBySlug("plumo-terms", {
        locale: "en-US",
    });
    if (!pageData) {
        return { notFound: true };
    }
    return {
        props: {
            ...pageData,
            ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.terms])),
        },
    };
}
export default Agreement;
//# sourceMappingURL=plumo-terms.jsx.map