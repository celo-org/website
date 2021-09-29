import Page from 'src/plumo/Landing';
import { getPageBySlug } from 'src/utils/contentful';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export default Page;
export async function getServerSideProps({ locale }) {
    const page = await getPageBySlug("plumo", { locale: 'en-US' }, true);
    if (!page) {
        return { notFound: true };
    }
    return {
        props: {
            ...page,
            ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.plumo])),
        }
    };
}
//# sourceMappingURL=plumo.jsx.map