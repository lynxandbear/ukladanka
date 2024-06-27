import { MirrorProps, Mirror } from "./Mirror"

export interface BlockProps {
    x: number
    y: number
    blockColor?: string
    strokeColor?: string

    mirrorColor: string
    onClick?: React.MouseEventHandler<SVGGElement>
}

export function Block23(props: BlockProps) {
    const transform = `translate(${props.x} ${props.y})`
    return <g className="block" pointerEvents="all" transform={transform} onClick={props.onClick}>
        <rect
            className="background"
            width={40} height={23} rx="3"
            stroke="none"
            fill={props.blockColor ?? "none"} />
        <path
            d="M 40 20
                   a 3,3 0 0 1 -3,3
                   h -34
                   a 3,3 0 0 1 -3,-3                   
                   a 20,20 0 0 1 40,0"
            fill={props.mirrorColor} />
        <rect
            className="foreground"
            width={40} height={23} rx="3"
            stroke={props.strokeColor ?? "black"} />
    </g>
}