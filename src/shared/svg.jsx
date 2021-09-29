import { unstable_createElement as createElement } from "react-native-web";
export function Path(props) {
    return createElement("path", { ...props, onClick: props.onPress });
}
export function G(props) {
    return createElement("g", props);
}
export function Line(props) {
    return createElement("line", props);
}
//# sourceMappingURL=svg.jsx.map