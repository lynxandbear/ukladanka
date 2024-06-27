import { BlockSize } from "./BlockSize"
import { MirrorProps, Mirror } from "./Mirror"

export interface BlockProps {
    size:        BlockSize
    orientation: number
    blockColor?:  string
    strokeColor?: string

    x: number
    y: number

    mirrors: MirrorProps[]
}

export function Block(props : BlockProps) {
    const transform = `translate(${props.x} ${props.y}) rotate(${props.orientation} ${props.size/2} ${props.size/2})`
    const rect = <rect width={props.size} height={props.size} rx="3" stroke={props.strokeColor ?? "black"} fill={props.blockColor ?? "none"} />
    const mirrors = props.mirrors.map(p => <Mirror key={p.size} {...p} />)

    return <g transform={transform}>{mirrors}{rect}</g>
}