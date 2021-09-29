import * as React from "react";
import dynamic from "next/dynamic";
export const YouTube = dynamic(import("react-youtube"));
export const GENERICS = {
    iFrameEmbed: ({ fields }) => {
        const url = fields.url;
        return <iframe src={url} height="500px"/>;
    },
    video: ({ fields }) => <YouTube videoId={fields.youtubeID}/>,
};
//# sourceMappingURL=GENERICS.jsx.map