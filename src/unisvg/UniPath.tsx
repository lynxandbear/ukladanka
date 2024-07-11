import {RenderingContext, UniPathProps} from "./renderingContext";
import {useContext} from "react";

export function UniPath(props: UniPathProps) {
    const r = useContext(RenderingContext)
    return r.renderPath(props)
}