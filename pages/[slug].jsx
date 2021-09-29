import CommonPage from "src/public-sector/CommonContentFullPage";
import { getPageBySlug } from "src/utils/contentful";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export default CommonPage;
export const getServerSideProps = async function getServerSideProps({ locale, params, }) {
    if (isBogus(params?.slug)) {
        return { notFound: true };
    }
    const page = await getPageBySlug(params.slug, { locale: "en-US" }, true);
    if (!page) {
        return { notFound: true };
    }
    return {
        props: {
            ...page,
            ...(await serverSideTranslations(locale, [NameSpaces.common])),
        },
    };
};
function isBogus(slug) {
    if (!slug) {
        return true;
    }
    else if (Array.isArray(slug)) {
        return true;
    }
    else if (slug.startsWith(".") ||
        slug.endsWith(".php") ||
        slug.includes("%") ||
        slug.includes("login") ||
        slug.includes("admin")) {
        return true;
    }
    return false;
}
//# sourceMappingURL=%5Bslug%5D.jsx.map