import {Block} from "./Block"
import {MirrorProps} from "./Mirror"
import React from "react";
import {SlotSize} from "./MirrorSize";

export interface PictureProps {
    width: number | string,
    height: number | string,
    highlighted?: SlotSize,
    strokeColor?: string,
    slots: Map<SlotSize, MirrorProps[]>,
    editable?: boolean
}
export default function Picture(props: PictureProps) {        
    return (<>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={props.width} height={props.height}
            viewBox="0 0 340 230" fill="none"
            pointerEvents="none">
            <g transform="translate(5,5)">
                <rect width="330" height="220" rx="3" stroke={props.strokeColor ?? "black"}/>
                {[...props.slots.keys()].map((slotSize) => (
                    <Block
                        editable={props.editable}
                        size={slotSize}
                        strokeColor={props.strokeColor}
                        mirrors={props.slots.get(slotSize) ?? []}
                    />
                ))}
            </g>
        </svg>
    </>)
}