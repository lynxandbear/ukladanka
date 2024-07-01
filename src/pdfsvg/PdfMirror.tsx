import {Path} from "@react-pdf/renderer"
import {MirrorProps} from "../svg/Mirror"
import React from "react";
import {MirrorSize} from "../svg/MirrorSize";

function quarterMirror({size, color}: MirrorProps) {
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
        fill={color}/>
}

function halfMirror(color: string) {
    return <Path
        d="M 40 20
                   a 3,3 0 0 1 -3,3
                   h -34
                   a 3,3 0 0 1 -3,-3                   
                   a 20,20 0 0 1 40,0"
        fill={color}/>
}

export const PdfMirror = (props: MirrorProps) => (
    props.size == MirrorSize.XS
        ? halfMirror(props.color)
        : quarterMirror(props)
)