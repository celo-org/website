import Head from "next/head";
import * as React from "react";
const BASE_URL = process.env.BASE_URL;
export default function OpenGraph({ description, image, title, path }) {
    const metaImage = typeof image === "string" && (image.startsWith("//") || image.startsWith("http"))
        ? image
        : BASE_URL + (typeof image === "object" ? image.src : image);
    return (<Head>
      <title>{title}</title>
      <meta name="description" content={description}/>

      <meta property="og:url" content={`${BASE_URL}${path}`}/>
      <meta property="og:title" content={title}/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content={metaImage}/>
      <meta property="og:description" content={description}/>

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={metaImage}/>
      <meta name="twitter:site" content={"@celoOrg"}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>);
}
//# sourceMappingURL=OpenGraph.jsx.map