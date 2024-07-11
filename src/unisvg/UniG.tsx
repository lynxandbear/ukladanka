import {RenderingContext, UniGProps} from "./renderingContext";
import {useContext} from "react";


export function UniG(props: UniGProps) {
    const r = useContext(RenderingContext)
    return r.renderG(props)
}
