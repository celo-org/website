import About from "src/about/About";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
import makeSafeForJson from "src/utils/makeSafeForJson";
export async function getServerSideProps({ locale }) {
    const getContributors = await import("src/../server/getContributors");
    const contributors = await getContributors.default();
    const shuffleSeed = await import("shuffle-seed").then((mod) => mod.default);
    const shuffledTeam = shuffleSeed.shuffle(contributors, Math.random());
    return {
        props: makeSafeForJson({
            contributors: shuffledTeam,
            ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.about])),
        }),
    };
}
export default About;
//# sourceMappingURL=about.jsx.map