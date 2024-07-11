import {useContext} from "react";
import {RenderingContext, UniEditorProps} from "./renderingContext";


export function UniEditor(props: UniEditorProps) {
    const r = useContext(RenderingContext)
    return r.renderEditor(props)
}