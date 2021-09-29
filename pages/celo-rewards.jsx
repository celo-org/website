import CeloRewards from "src/celo-rewards/CeloRewards";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NameSpaces } from "src/i18n";
export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.celoRewards])),
        },
    };
}
export default CeloRewards;
//# sourceMappingURL=celo-rewards.jsx.map