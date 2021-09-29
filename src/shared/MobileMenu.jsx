import { css } from "@emotion/react";
import * as React from "react";
import { flex } from "src/estyles";
import { NameSpaces, useTranslation } from "src/i18n";
import RingsGlyph from "src/logos/RingsGlyph";
import Button, { BTN } from "src/shared/Button.3";
export default function MobileMenu({ currentPage, menu }) {
    const { t } = useTranslation(NameSpaces.common);
    return (<div css={styles.root}>
      <div css={styles.menu}>
        {menu.map((item) => {
            const linkIsToCurrentPage = currentPage === item.link;
            const btnKind = linkIsToCurrentPage ? BTN.TERTIARY : BTN.NAV;
            return (<div key={item.name} css={styles.menuItem}>
              <Button href={item.link} text={t(item.name)} kind={btnKind} key={item.name} align={"center"} style={btnStyle}/>
            </div>);
        })}
      </div>
      <div css={styles.rings}>
        <RingsGlyph height={30}/>
      </div>
    </div>);
}
const styles = {
    root: css(flex, {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 20,
        paddingLeft: 20,
    }),
    rings: css(flex, {
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: "center"
    }),
    menu: css(flex, {
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "column",
        justifyContent: "space-around",
    }),
    menuItem: css(flex, {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 25,
        marginBottom: 25,
    }),
};
const btnStyle = {
    fontSize: 20,
    alignItems: "center",
};
//# sourceMappingURL=MobileMenu.jsx.map