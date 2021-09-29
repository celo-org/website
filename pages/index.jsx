import Home from "src/home/Home";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
import { getPageBySlug } from "src/utils/contentful";
export const getServerSideProps = async function getServerSideProps() {
    const page = await getPageBySlug("home", { locale: "en-US" }, true);
    if (!page) {
        return { notFound: true };
    }
    const sections = page.sections;
    const cover = sections.find(finder("cover"));
    const press = sections.find(finder("logoGallery"));
    const filtered = sections.filter(({ sys: { contentType: { sys }, }, }) => sys.id === "grid-row" || sys.id === "horizontal");
    return {
        props: {
            ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.home])),
            ...page,
            cover: cover?.fields,
            press: press?.fields,
            sections: filtered,
        },
    };
};
const finder = (key) => (section) => section.sys.contentType.sys.id === key;
export default Home;
//# sourceMappingURL=index.jsx.map