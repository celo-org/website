import { colors } from "src/styles";
export const pagePaths = {
    HOME: {
        name: "Home",
        link: "/",
        isDark: true,
        translucent: {
            backgroundHover: colors.darkTransparent,
        },
        menuHidePoint: 24,
        menuHidePointMobile: 50,
    },
    ABOUT_US: {
        name: "About",
        link: "/about",
        isDark: false,
        translucent: {
            backgroundHover: colors.darkTransparent,
        },
    },
    ALLIANCE_COLLECTIVE: {
        name: "Alliance",
        link: "/alliance",
        isDark: true,
        translucent: {
            backgroundHover: colors.darkTransparent,
        },
    },
    APPLICATIONS: {
        name: "Applications",
        link: "/applications",
        isDark: false,
    },
    BRAND: {
        name: "BrandKit",
        link: "/experience/brand",
        isDark: false,
    },
    BRAND_POLICY: {
        name: "Brand Policy",
        link: "/brand-policy",
        isDark: false,
    },
    BUILD: {
        name: "Validators",
        link: "/validators",
        isDark: true,
    },
    CBE: {
        name: "Coinbase",
        link: "/coinbase-earn",
        isDark: false,
        translucent: {
            backgroundHover: "rgba(22, 82, 235, 0.6)",
        },
        menuHidePoint: 420,
        menuHidePointMobile: 320,
    },
    CELO_REWARDS: {
        name: "CELO Rewards",
        link: "/celo-rewards",
        isDark: false,
    },
    CELO_REWARDS_EDUCATION: {
        name: "CELO Rewards",
        link: "/celo-rewards-education",
        isDark: false,
    },
    CELO_REWARDS_TERMS: {
        name: "CELO Rewards",
        link: "/celo-rewards-terms-and-conditions",
        isDark: false,
    },
    COMMUNITY: {
        name: "Community",
        link: "/community",
        isDark: false,
    },
    EVENTS_KIT: {
        name: "EventKit",
        link: "/experience/events",
        isDark: false,
    },
    DEVELOPERS: {
        name: "Developers",
        link: "/developers",
        isDark: true,
    },
    ECOSYSTEM: {
        name: "Ecosystem",
        link: "/dapps",
        isDark: true,
    },
    FLOWERS: {
        name: "For Value Flowers",
        link: "/flowers",
    },
    FAUCET: {
        name: "Faucet",
        link: "/developers/faucet",
        isDark: false,
    },
    GRANT_KIT: {
        name: "GrantKit",
        link: "/experience/grants",
        isDark: false,
    },
    PILOT_KIT: {
        name: "PilotKit",
        link: "/experience/pilots",
        isDark: false,
    },
    JOBS: {
        name: "Join",
        link: "/jobs",
        isDark: false,
    },
    MERCHANTS: {
        name: "MerchantKit",
        link: "/experience/merchant",
        isDark: false,
    },
    PRIVACY: {
        name: "Privacy Policy",
        link: "/privacy",
        isDark: false,
    },
    PAPERS: {
        name: "White Papers",
        link: "/papers",
        isDark: false,
    },
    PRESS: {
        name: "Press",
        link: "/press",
    },
    PLUMO: {
        name: "Plumo",
        link: "/plumo",
        isDark: true,
    },
    PUBLIC_SECTOR: {
        name: "Government",
        link: "/public-sector",
        isDark: true,
        translucent: {
            backgroundHover: colors.darkTransparent,
        },
        menuHidePoint: 250,
        menuHidePointMobile: 150,
    },
    TECH: {
        name: "Technology",
        link: "/technology",
        isDark: false,
    },
    TERMS: {
        name: "Terms",
        link: "/terms",
        isDark: false,
    },
    VALIDATORS_LIST: {
        name: "Validators List",
        link: "/validators/explore",
        isDark: true,
    },
    VALIDATORS_LIST__BAKLAVA: {
        name: "Validators List - Baklava",
        link: "/validators/explore/baklava",
        isDark: true,
    },
    VALIDATORS_LIST_BAKLAVASTAGING: {
        name: "Validators List - Baklavastaging",
        link: "/validators/explore/baklavastaging",
        isDark: true,
    },
    WALLET: {
        name: "Test Wallet",
        link: "/developers/wallet",
        isDark: true,
    },
};
export const MAIN_MENU = [
    pagePaths.ABOUT_US,
    pagePaths.DEVELOPERS,
    pagePaths.COMMUNITY,
    pagePaths.ECOSYSTEM,
    pagePaths.ALLIANCE_COLLECTIVE,
    pagePaths.PUBLIC_SECTOR,
];
export var CeloLinks;
(function (CeloLinks) {
    CeloLinks["alfajoresWebWallet"] = "https://alfajores.celowallet.app";
    CeloLinks["audits"] = "/audits";
    CeloLinks["agreement"] = "/user-agreement";
    CeloLinks["faucet"] = "/developers/faucet";
    CeloLinks["iconsLicense"] = "https://creativecommons.org/licenses/by-nd/4.0/legalcode";
    CeloLinks["discord"] = "https://discord.gg/6yWMkgM";
    CeloLinks["discourse"] = "https://forum.celo.org/";
    CeloLinks["walletApp"] = "/developers/wallet";
    CeloLinks["alfajoresBlockscout"] = "http://alfajores-blockscout.celo-testnet.org/";
    CeloLinks["disclaimer"] = "https://docs.celo.org/important-information/mainnet-network-disclaimer";
    CeloLinks["docs"] = "https://docs.celo.org/";
    CeloLinks["docsOverview"] = "https://docs.celo.org/overview";
    CeloLinks["sdkDocs"] = "https://docs.celo.org/v/master/developer-guide/overview/introduction";
    CeloLinks["sdkTutorial"] = "https://docs.celo.org/v/master/developer-guide/start";
    CeloLinks["nodeDocs"] = "https://docs.celo.org/getting-started/running-a-full-node";
    CeloLinks["gettingStarted"] = "https://docs.celo.org/getting-started/alfajores-testnet";
    CeloLinks["coinlist"] = "https://coinlist.co/celo?utm_source=celo%20website&utm_medium=website%20widget&utm_campaign=celowebsite_20200318";
    CeloLinks["gitHub"] = "https://github.com/celo-org/celo-monorepo";
    CeloLinks["reserve"] = "https://www.celoreserve.org";
    CeloLinks["instagram"] = "https://www.instagram.com/celoorg/";
    CeloLinks["twitter"] = "https://twitter.com/CeloOrg";
    CeloLinks["kuneco"] = "https://app.livestorm.co/clabs/kuneco";
    CeloLinks["medium"] = "https://medium.com/celoOrg";
    CeloLinks["mediumUser"] = "https://medium.com/@celoorg";
    CeloLinks["mediumPublication"] = "https://medium.com/celoOrg";
    CeloLinks["fundingRequest"] = "mailto:partner@celo.org";
    CeloLinks["linkedIn"] = "https://www.linkedin.com/company/celoOrg/";
    CeloLinks["blockChainRepo"] = "https://github.com/celo-org/celo-blockchain";
    CeloLinks["playStoreDevWallet"] = "https://play.google.com/apps/testing/org.celo.mobile.alfajores";
    CeloLinks["appStoreDevWallet"] = "https://testflight.apple.com/join/s212x3Rp";
    CeloLinks["privacyDocs"] = "https://docs.celo.org/celo-codebase/protocol/identity/phone-number-privacy";
    CeloLinks["tutorial"] = "https://docs.celo.org/getting-started/faucet#creating-an-empty-account-with-the-celo-client";
    CeloLinks["buildWalletDocs"] = "https://docs.celo.org/celo-codebase/wallet/intro";
    CeloLinks["stakeOffTerms"] = "/stake-off/terms";
    CeloLinks["valora"] = "https://valoraapp.com";
    CeloLinks["celoWebWallet"] = "https://celowallet.app";
    CeloLinks["youtube"] = "https://youtube.com/channel/UCCZgos_YAJSXm5QX5D5Wkcw";
    CeloLinks["defiPulse"] = "https://defipulse.com/";
    CeloLinks["aboutCeloGovernance"] = "https://medium.com/celoorg/celo-gold-holders-make-your-voice-heard-through-on-chain-governance-96cb5a1e8b90";
    CeloLinks["fundWallet"] = "https://valoraapp.com/support/fund-wallet";
    CeloLinks["confirmNumber"] = "https://valoraapp.com/support/get-started-with-valora#phone-number-confirmation";
    CeloLinks["communityFund"] = "https://docs.celo.org/celo-codebase/protocol/proof-of-stake/epoch-rewards/community-fund";
    CeloLinks["celoRewardsDiscussion"] = "https://forum.celo.org/t/governance-proposal-to-reward-early-users/662/42";
    CeloLinks["twitch"] = "https://www.twitch.tv/celoorg";
    CeloLinks["reddit"] = "https://www.reddit.com/r/celo/";
    CeloLinks["telegram"] = "https://t.me/celoplatform";
})(CeloLinks || (CeloLinks = {}));
export const languageOptions = {
    EN: {
        label: "EN",
        language: "EN",
    },
    ES: {
        label: "ES",
        language: "ES",
    },
};
export const hashNav = {
    about: { backers: "backers" },
    build: {
        features: "features",
        stack: "stack",
        newsletter: "newsletter",
        applications: "applications",
        contracts: "contracts",
        blockchain: "blockchain",
        leaderboard: "leaderboard",
    },
    connect: {
        tenets: "tenets",
        code: "code",
        events: "events",
        blog: "blog",
        fellowship: "fellowship",
        fund: "fund",
        newsletter: "newsletter",
    },
    join: { roles: "roles" },
    home: { partnerships: "partnerships", timeline: "timeline" },
    brandIntro: { overview: "overview", brandVoice: "brand-voice" },
    brandLogo: { overview: "overview", space: "space-and-sizing", backgrounds: "backgrounds" },
    brandColor: { overview: "overview", backgrounds: "background-colors" },
    brandComposition: {
        overview: "overview",
        grid: "grid",
    },
    brandImagery: {
        overview: "overview",
        illustrations: "illustrations",
        graphics: "abstract-graphics",
    },
    brandIcons: {
        overview: "overview",
    },
    brandTypography: { overview: "overview", scale: "type-scale" },
    eventsIntro: {
        overview: "overview",
        brandVoice: "brand-voice",
    },
    eventsFlavor: {
        overview: "overview",
        foster: "foster",
        uniqueGifts: "unique-gifts",
        rituals: "rituals",
        tenets: "tenets",
    },
    eventsResources: {
        overview: "overview",
        quickTips: "quick-tips",
        planning: "planning",
        social: "social-media",
    },
    eventExamples: {
        examples: "examples",
        slideDecks: "slide-decks",
        videos: "videos",
    },
    eventCircles: {
        overview: "overview",
        sponsorship: "sponsorship",
    },
};
export default pagePaths;
//# sourceMappingURL=menu-items.js.map