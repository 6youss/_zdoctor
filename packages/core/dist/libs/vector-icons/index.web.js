import React from "react";
import _MaterialIconsOriginal from "react-native-vector-icons/dist/MaterialIcons";
import _OcticonsOriginal from "react-native-vector-icons/dist/Octicons";
import MaterialIconFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import OcticonsFont from "react-native-vector-icons/Fonts/Octicons.ttf";
const MaterialIconsOriginal = _MaterialIconsOriginal;
const OcticonsOriginal = _OcticonsOriginal;
export const MaterialIcons = (props) => React.createElement(MaterialIconsOriginal, {
    ...props,
    style: [props.style, { userSelect: "none" }]
});
export const Octicons = (props) => React.createElement(OcticonsOriginal, {
    ...props,
    style: [props.style, { userSelect: "none" }]
});
const iconStyles = [
    `@font-face { src:url(${MaterialIconFont});font-family: MaterialIcons; }`,
    `@font-face { src:url(${OcticonsFont});font-family: Octicons; }`
].join("\n");
const style = document.createElement("style");
style.type = "text/css";
if (style.styleSheet) {
    style.styleSheet.cssText = iconStyles;
}
else {
    style.appendChild(document.createTextNode(iconStyles));
}
if (document.head)
    document.head.appendChild(style);
//# sourceMappingURL=index.web.js.map