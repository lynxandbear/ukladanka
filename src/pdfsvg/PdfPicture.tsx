import {G, Rect, Svg} from "@react-pdf/renderer"
import {MirrorProps} from "../svg/Mirror"
import {PdfBlock} from "./PdfBlock"
import {SlotSize} from "../svg/MirrorSize"
import {Block} from "../svg/Block";
import React from "react";

export interface PdfPictureProps {
    width: number | string
    height: number | string

    slots: Map<SlotSize, MirrorProps[]>,
}

export default function Picture(props: PdfPictureProps) {
    return (<>
        <Svg
            width={props.width} height={props.height}
            viewBox="0 0 340 230" fill="none">
            <G transform="translate(5,5)">
                <Rect width="330" height="220" rx="3" ry="3" stroke="black" fill="none"/>
                {[...props.slots.keys()].map((slotSize) => (
                    <PdfBlock
                        size={slotSize}
                        mirrors={props.slots.get(slotSize) ?? []}
                    />
                ))}
            </G>
        </Svg>
    </>)
}