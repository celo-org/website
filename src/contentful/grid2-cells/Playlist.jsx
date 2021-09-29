import Thumbnail from "src/shared/Thumbnail";
import { flexRow, fonts, WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { css } from "@emotion/react";
import { NameSpaces, useTranslation } from "src/i18n";
import renderNode from "src/contentful/nodes/paragraph";
import Chevron, { Direction } from "src/icons/chevron";
import { colors } from "src/styles";
import * as React from "react";
import useSwipe from "@odnh/use-swipe";
import { useYoutube } from "src/hooks/useYoutubePlaylist";
import { useBooleanToggle } from "src/hooks/useBooleanToggle";
import { useScreenSize } from "src/layout/ScreenSize";
const MIN_SHOWING = 3;
export default function PlayList(props) {
    const [expanded, toggleExpansion] = useBooleanToggle();
    const { isMobile } = useScreenSize();
    const youTubePlayist = useYoutube(props.listId);
    const allItems = React.useMemo(() => {
        const media = props.media
            ?.filter(({ fields }) => fields.image?.fields?.file)
            .map(({ fields, sys }) => ({
            ...fields,
            id: sys.id,
            altText: fields?.image?.fields?.description,
            image: `https:${fields.image.fields.file.url}`,
        })) || [];
        return [...media, ...(youTubePlayist || [])];
    }, [youTubePlayist, props.media]);
    const displayedItems = !expanded && !isMobile ? allItems.slice(0, MIN_SHOWING) : allItems;
    const showButton = allItems.length > MIN_SHOWING;
    const Component = isMobile ? Slider : Expander;
    return (<>
      <Head title={props.title} description={props.description}/>
      <Component isExpanded={expanded}>
        {displayedItems.map((item) => {
            return (<Thumbnail key={item.id} id={item.id} title={item.title} link={item.link} altText={item.altText} image={item.image}/>);
        })}
      </Component>
      <ToggleButtonArea showButton={showButton} toggleExpansion={toggleExpansion} expanded={expanded}/>
    </>);
}
const buttonCss = css(fonts.navigation, {
    background: "none",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    svg: {
        marginLeft: 8,
    },
});
const headCss = css({
    gridColumn: "span 2",
    paddingBottom: 12,
    [WHEN_MOBILE]: {
        maxWidth: 480,
        width: "calc(100vw - 24px)",
    }
});
const expanderContractorCss = css(flexRow, {
    maxWidth: "100vw",
    gridColumn: "span 3",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    [WHEN_MOBILE]: {
        display: "none",
    },
});
const BOUNDARY = 15;
const Head = React.memo(function _Head({ title, description, }) {
    return (<div css={headCss}>
      <h3 css={fonts.h3}>{title}</h3>
      {documentToReactComponents(description, { renderNode })}
    </div>);
});
const ToggleButtonArea = React.memo(function _ToggleButtonArea(props) {
    const { t } = useTranslation(NameSpaces.common);
    return (props.showButton && (<div css={expanderContractorCss}>
        <button css={buttonCss} onClick={props.toggleExpansion}>
          {props.expanded ? t("collapse") : t("showAll")}
          <Chevron color={colors.dark} direction={props.expanded ? Direction.up : Direction.down}/>
        </button>
      </div>));
});
function useSideways(childCount) {
    const { screen, isMobile } = useScreenSize();
    const lastPause = React.useRef(0);
    const previousPosition = React.useRef(0);
    const childWidth = React.useRef(1);
    const elementRef = React.useRef(null);
    React.useLayoutEffect(() => {
        childWidth.current = ((elementRef.current.firstElementChild?.offsetWidth || 0) + gap);
    }, [childCount, screen]);
    const { x: delta, state } = useSwipe(elementRef, {});
    if (!isMobile) {
        return { position: 0, swipeRef: elementRef, state: "done" };
    }
    let currentPosition = delta + lastPause.current;
    const maxDistance = childWidth.current * (childCount - 0.5);
    if (state === "done") {
        lastPause.current = Math.max(Math.round(previousPosition.current / childWidth.current) * Math.abs(childWidth.current), -maxDistance);
        currentPosition = lastPause.current;
    }
    else if (currentPosition > BOUNDARY) {
        currentPosition = BOUNDARY;
    }
    else if (currentPosition < -maxDistance) {
        currentPosition = -maxDistance;
    }
    previousPosition.current = isNaN(currentPosition) ? 0 : currentPosition;
    return { position: previousPosition.current, swipeRef: elementRef, state };
}
const gap = 24;
const rootCss = css({
    display: "grid",
    gridColumn: "span 3",
    columnGap: gap,
    rowGap: 36,
    gridTemplateColumns: "1fr 1fr 1fr",
});
const sliderCSS = css(rootCss, {
    [WHEN_MOBILE]: {
        cursor: "grab",
        "&:active": {
            cursor: "grabbing",
        },
        marginBottom: 16,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        transitionProperty: "transform",
    },
});
const expanderCss = css(rootCss, {
    [WHEN_TABLET_AND_UP]: {
        transitionProperty: "max-height",
        transitionDuration: "100ms",
        maxHeight: "220px",
    },
});
const expandedCss = css({
    [WHEN_TABLET_AND_UP]: {
        maxHeight: "4000px",
        transitionDuration: "400ms",
    },
});
function Slider({ children, isExpanded }) {
    const childCount = React.Children.count(children);
    const { swipeRef, position, state } = useSideways(childCount);
    return (<div draggable="true" ref={swipeRef} css={css(sliderCSS, isExpanded && expandedCss, {
            [WHEN_MOBILE]: {
                width: `${childCount}00vw`,
                transitionDuration: state === "done" ? "300ms" : "1ms",
                transform: `translateX(${position}px)`,
            },
        })}>
      {children}
    </div>);
}
function Expander({ children, isExpanded }) {
    return <div css={css(expanderCss, isExpanded && expandedCss)}>{children}</div>;
}
//# sourceMappingURL=Playlist.jsx.map