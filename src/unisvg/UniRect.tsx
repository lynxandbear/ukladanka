import {RenderingContext, UniRectProps} from "./renderingContext";
import {useContext} from "react";

export function UniRect(props: UniRectProps) {
    const r = useContext(RenderingContext)
    return r.renderRect(props)
}