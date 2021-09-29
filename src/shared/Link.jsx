import Link from "next/link";
import * as React from "react";
export default function Link2({ href, children, passHref, prefetch = false }) {
    if (href) {
        return (<Link prefetch={prefetch} href={href} passHref={passHref}>
        {children}
      </Link>);
    }
    else {
        return <>{children}</>;
    }
}
//# sourceMappingURL=Link.jsx.map