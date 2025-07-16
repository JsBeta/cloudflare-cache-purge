import check from "./check.svg";
import icoEntry from "./ico-entry.svg";
import icoCss from "./ico-css.svg";
import icoJs from "./ico-js.svg";
import icoImg from "./ico-img.svg";
import icoLink from "./ico-ink.svg";
import icoUrl from "./ico-url.svg";
import iconStyle from "./sprite.module.css";

const icons = {
    check,
    icoEntry,
    icoCss,
    icoJs,
    icoImg,
    icoLink,
    icoUrl,
};



const iconIds = Object.fromEntries(
    Object.entries(icons).map(([name, value]) => [
        name,
        value.match(/<symbol id="([^"]+)"/)?.[1],
    ])
);

const xmlns = "http://www.w3.org/2000/svg";
const xlink = "http://www.w3.org/1999/xlink";
const svgSpriteElement = document.createElementNS(xmlns, "svg");
svgSpriteElement.setAttribute("aria-hidden", "true");
svgSpriteElement.setAttribute(
    "style",
    "position: absolute; width: 0; height: 0; overflow: hidden;"
);
svgSpriteElement.setAttribute("version", "1.1");
svgSpriteElement.setAttribute("xmlns", xmlns);
svgSpriteElement.setAttribute("xmlns:xlink", xlink);
svgSpriteElement.innerHTML = [
    "<defs>",
    ...Object.values(icons),
    "</defs>",
].join("");
document.body.appendChild(svgSpriteElement);

export const renderIcon = (iconId, ...classList) => {
    const svgElement = document.createElementNS(xmlns, "svg");
    const useElement = document.createElementNS(xmlns, "use");
    svgElement.classList.add(iconStyle.icon, ...classList);
    useElement.setAttributeNS(xlink, "href", `#${iconIds[iconId]}`);
    useElement.classList.add("icon");
    svgElement.appendChild(useElement);
    return svgElement;
};
