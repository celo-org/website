import { unstable_createElement as createElement } from "react-native-web";
export function Form(props) {
    return createElement("form", props);
}
export function Label({ children, htmlFor, onPress, style }) {
    return createElement("label", { htmlFor, name: htmlFor, children, onClick: onPress, style });
}
//# sourceMappingURL=FormComponents.jsx.map