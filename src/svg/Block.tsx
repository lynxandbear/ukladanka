import { BlockSize } from "./BlockSize"
import { MirrorProps, Mirror } from "./Mirror"

export interface BlockProps {
    size: BlockSize
    orientation: number
    blockColor?: string
    strokeColor?: string

    x: number
    y: number

    mirrors: MirrorProps[]
    onClick?: React.MouseEventHandler<SVGGElement>
}

export function Block(props: BlockProps) {
    const transform = `translate(${props.x} ${props.y}) rotate(${props.orientation} ${props.size / 2} ${props.size / 2})`

    return <g className="block" pointerEvents="all" transform={transform} onClick={props.onClick}>
        <rect
            className="background"
            width={props.size} height={props.size} rx="3"
            stroke="none"
            fill={props.blockColor ?? "none"} />
        {props.mirrors.map(p => <Mirror key={p.size} {...p} />)}
        <rect
            className="foreground"
            width={props.size} height={props.size} rx="3"
            stroke={props.strokeColor ?? "black"}/>
    </g>
}