import {MirrorSize} from "./MirrorSize"
import React from "react";

import {UniPath} from "../unisvg/UniPath";

export interface MirrorProps {
    size: MirrorSize,
    color: string
}

function quarterMirror({size, color}: MirrorProps) {
    const withoutCorners = size - 6
    const withoutOneCorner = size - 3

    return <UniPath
        className="mirror"
        d={`m 3 0
            h ${withoutCorners} 
            a 3,3 0 0 1 3,3 
            a ${withoutOneCorner},${withoutOneCorner} 0 0 1 -${withoutOneCorner},${withoutOneCorner}
            a 3,3 0 0 1 -3,-3
            v -${withoutCorners}
            a 3,3 0 0 1 3,-3`}
        fill={color}/>
}

function halfMirror(color: string)  {
    return <UniPath
        d="M 40 20
           a 3,3 0 0 1 -3,3
           h -34
           a 3,3 0 0 1 -3,-3                   
           a 20,20 0 0 1 40,0"
        fill={color}/>
}

export const Mirror = (props: MirrorProps) => (
    props.size == MirrorSize.XS
        ? halfMirror(props.color)
        : quarterMirror(props)
)