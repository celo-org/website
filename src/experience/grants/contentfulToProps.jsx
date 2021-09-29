export function contentfulToProps({ fields }) {
    const file = fields?.logo?.fields?.file;
    const image = file?.details?.image;
    return {
        ...fields,
        logo: file?.url,
        logoHeight: image?.height || 0,
        logoWidth: image?.width || 0,
    };
}
//# sourceMappingURL=contentfulToProps.jsx.map