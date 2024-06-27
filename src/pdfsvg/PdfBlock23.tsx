import { G, Path, Rect } from "@react-pdf/renderer"

export interface PdfBlockProps {
    x: number
    y: number

    mirrorColor: string
}

export function PdfBlock23(props: PdfBlockProps) {
    const transform = `translate(${props.x} ${props.y})`
    return <G transform={transform}>
        <Path
            d="M 40 20
                   a 3,3 0 0 1 -3,3
                   h -34
                   a 3,3 0 0 1 -3,-3                   
                   a 20,20 0 0 1 40,0"
            fill={props.mirrorColor} />
        <Rect width={40} height={23} rx="3" ry="3" stroke="black" fill="none"  />
    </G>
}