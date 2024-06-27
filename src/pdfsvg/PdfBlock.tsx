import { G, Rect } from "@react-pdf/renderer"
import { BlockSize } from "../svg/BlockSize"
import { PdfMirror } from "./PdfMirror"
import { MirrorProps } from "../svg/Mirror"

export interface PdfBlockProps {
    size: BlockSize
    orientation: number

    x: number
    y: number

    mirrors: MirrorProps[]
}

export function PdfBlock(props: PdfBlockProps) {
    // const transform = `translate(${props.x} ${props.y}) rotate(${props.orientation} ${props.size / 2} ${props.size / 2})`
    const transform = `translate(${props.x} ${props.y}) rotate(${props.orientation} ${props.size / 2},${props.size / 2})`

    return <G transform={transform}>
        {props.mirrors.map(p => <PdfMirror key={p.size} {...p} />)}
        <Rect width={props.size} height={props.size} rx="3" ry="3" stroke="black" fill="none" />
    </G>
}