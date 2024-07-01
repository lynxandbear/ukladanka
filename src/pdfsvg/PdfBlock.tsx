import { G, Rect } from "@react-pdf/renderer"
import {SlotSize} from "../svg/MirrorSize"
import { PdfMirror } from "./PdfMirror"
import { MirrorProps } from "../svg/Mirror"

export interface PdfBlockProps {
    size: SlotSize

    mirrors: MirrorProps[]
}

export function PdfBlock(props: PdfBlockProps) {
    const translateX = [90, 180].includes(props.size.orientation) ? props.size.x + props.size.width : props.size.x
    const translateY = [180, 270].includes(props.size.orientation) ? props.size.y + props.size.height : props.size.y
    const transform = `translate(${translateX} ${translateY}) rotate(${props.size.orientation} ${props.size.width / 2} ${props.size.height / 2})`

    return <G transform={transform}>
        {props.mirrors.map(p => <PdfMirror key={p.size} {...p} />)}
        <Rect width={props.size.width} height={props.size.height} rx="3" ry="3" stroke="black" fill="none" />
    </G>
}