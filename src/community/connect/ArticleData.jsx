import * as React from "react";
import ArticlesSection from "src/community/connect/ArticlesSection";
import { getSentry } from "src/utils/sentry";
const BASE_PATH = "/api/blog";
async function getArticles(tagged) {
    const path = tagged ? `${BASE_PATH}?tagged=${tagged}` : BASE_PATH;
    const res = await fetch(path, { method: "GET" });
    return res.json();
}
export default class ArticleData extends React.PureComponent {
    state = { articles: [], loaded: false, errored: false };
    componentDidMount = async () => {
        try {
            const { articles } = await getArticles(this.props.tagged);
            this.setState({ articles, loaded: true });
        }
        catch (e) {
            this.setState({ errored: true });
            const Sentry = await getSentry();
            Sentry.captureMessage(`ArticleData / ${e.message}`, "error");
        }
    };
    render() {
        const { articles, loaded, errored } = this.state;
        if (errored) {
            return null;
        }
        return <ArticlesSection title={this.props.title} articles={articles} loading={!loaded}/>;
    }
}
//# sourceMappingURL=ArticleData.jsx.map