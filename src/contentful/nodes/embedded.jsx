import { BUTTON } from "src/contentful/nodes/embeds/BUTTON";
import { GENERICS } from "src/contentful/nodes/embeds/GENERICS";
import { GRID } from "src/contentful/nodes/embeds/GRID";
import { KIT_NODES } from "src/contentful/nodes/embeds/KIT_NODES";
import { TABLE } from "./embeds/TABLE";
const EMBEDDABLE = {
    ...BUTTON,
    ...GENERICS,
    ...TABLE,
    ...GRID,
    ...KIT_NODES,
};
export function embedded(node) {
    const contentType = node.data?.target?.sys?.contentType?.sys?.id;
    const renderer = EMBEDDABLE[contentType];
    if (renderer) {
        return renderer(node.data.target);
    }
    else {
        console.info(contentType);
        return null;
    }
}
//# sourceMappingURL=embedded.jsx.map