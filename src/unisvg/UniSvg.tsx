import {useContext} from "react";
import {RenderingContext, UniRectProps, UniSvgProps} from "./renderingContext";


export function UniSvg(props: UniSvgProps) {
    const r = useContext(RenderingContext)
    return r.renderSvg(props)
}