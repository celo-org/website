import * as React from "react";
import Button, { BTN } from "src/shared/Button.3";
import Spinner from "src/shared/Spinner";
import { colors } from "src/styles";
export default React.memo(function SubmitButton({ isLoading, text, onDarkBackground, onPress, size, align, style, }) {
    return (<Button onDarkBackground={onDarkBackground} iconLeft={isLoading && <Spinner size={"small"} color={colors.white}/>} text={!isLoading && text} kind={BTN.PRIMARY} onPress={onPress} size={size} disabled={isLoading} align={align} style={style}/>);
});
//# sourceMappingURL=SubmitButton.jsx.map