import page from "src/public-sector/CommonContentFullPage";
import { getPageBySlug } from "src/utils/contentful";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export default page;
export async function getServerSideProps({ locale }) {
    const page = await getPageBySlug("public-sector", { locale: "en-US" }, true);
    if (!page) {
        return { notFound: true };
    }
    return {
        props: {
            ...page,
            ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.terms])),
        },
    };
}
//# sourceMappingURL=public-sector.jsx.map