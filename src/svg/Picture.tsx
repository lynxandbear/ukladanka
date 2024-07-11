import {Block} from "./Block"
import {MirrorProps} from "./Mirror"
import React from "react";
import {SlotSize} from "./MirrorSize";
import {UniSvg} from "../unisvg/UniSvg";
import {UniG} from "../unisvg/UniG";
import {UniRect} from "../unisvg/UniRect";

export interface PictureProps {
    width: number | string,
    height: number | string,
    strokeColor?: string,
    slots: Map<SlotSize, MirrorProps[]>,
    editable?: boolean
}

export default function Picture(props: PictureProps) {
    return (
        <UniSvg
            width={props.width} height={props.height}
            viewBox="0 0 340 230" fill="none">
            <UniG transform={{x: 5, y: 5, width: 340, height: 230, orientation: 0}}>
                <UniRect width="330" height="220" rx="3" ry="3" stroke={props.strokeColor ?? "black"} fill="none"/>
                {[...props.slots.keys()].map((slotSize) => (
                    <Block
                        key={slotSize.name}
                        editable={props.editable}
                        size={slotSize}
                        strokeColor={props.strokeColor}
                        mirrors={props.slots.get(slotSize) ?? []}
                    />
                ))}
            </UniG>
        </UniSvg>)
}