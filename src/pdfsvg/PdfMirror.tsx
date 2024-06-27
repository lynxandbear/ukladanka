import { Path } from "@react-pdf/renderer"
import { MirrorProps } from "../svg/Mirror"

export function PdfMirror({size, color} : MirrorProps) {
    const withoutCorners = size - 6
    const withoutOneCorner = size - 3

    return <Path 
        d={`m 3 0
            h ${withoutCorners} 
            a 3,3 0 0 1 3,3 
            a ${withoutOneCorner},${withoutOneCorner} 0 0 1 -${withoutOneCorner},${withoutOneCorner}
            a 3,3 0 0 1 -3,-3
            v -${withoutCorners}
            a 3,3 0 0 1 3,-3`} 
        fill={color} />
}