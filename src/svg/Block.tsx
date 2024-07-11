import {EditorPosition, SlotSize} from "./MirrorSize"
import {Mirror, MirrorProps} from "./Mirror"
import React from "react";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import MirrorControl from "../controls/MirrorControls";
import {setColor} from "../app/pictureSlice";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {bindPopover, bindTrigger} from "material-ui-popup-state";
import {PopupState, usePopupState} from "material-ui-popup-state/hooks";
import {PopoverOrigin} from "@mui/material/Popover/Popover";
import {UniG} from "../unisvg/UniG";
import {UniRect} from "../unisvg/UniRect";
import {UniEditor} from "../unisvg/UniEditor";


export interface BlockProps {
    size: SlotSize
    strokeColor?: string
    mirrors: MirrorProps[]
}

const ColorPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    elevation: 3
}));

function transformOriginFrom(editorPosition: EditorPosition): PopoverOrigin {
    return {
        horizontal: editorPosition.horizontal === "left" ? "right": "left",
        vertical: editorPosition.vertical
    }    
}

function SlotAndMirrors(props: BlockProps & {popupState?: PopupState}) {
    return <UniG className="block" pointerEvents="all" transform={props.size} {...(props.popupState === undefined ? {} : bindTrigger(props.popupState))}>
        <UniRect
            className="background"
            width={props.size.width} height={props.size.height} rx="3" ry="3"
            stroke="none"
            fill="none"/>
        {props.mirrors.map(p => <Mirror key={p.size} {...p} />)}
        <UniRect
            className="foreground"
            width={props.size.width} height={props.size.height} rx="3" ry="3"
            stroke={props.strokeColor ?? "black"}
            fill="none"/>
    </UniG>;
}

export function EditorPopover(props: BlockProps & {popupState: PopupState}) {
    const dispatch = useAppDispatch();
    const slots = useAppSelector(state => state.picture.slots)
    
    function mirrorControls(slot: SlotSize) {
        return slot.mirrors.map(mirror =>
            <MirrorControl
                key={mirror}
                block={slot}
                mirror={mirror}
                setColor={color => dispatch(setColor({slot: slot.name, mirror, color}))}
                color={slots[slot.name][mirror]}/>);
    }
    
    return <Popover
        {...bindPopover(props.popupState)}
        anchorOrigin={props.size.editorPosition}
        transformOrigin={transformOriginFrom(props.size.editorPosition)}>
        <ColorPaper>
            <Stack direction="column" spacing={5}>
                {mirrorControls(props.size)}
            </Stack>
        </ColorPaper>
    </Popover>;
}

function EditableBlock(props: BlockProps) {
    const popupState = usePopupState({
        variant: "popover",
        popupId: `popover-${props.size.name}`})

    return <>
        <SlotAndMirrors popupState={popupState} {...props} />
        <UniEditor popupState={popupState} {...props} />
    </>
}

function StaticBlock(props: BlockProps) {
    return <SlotAndMirrors {...props} />
}

export function Block(props: BlockProps & {editable?: boolean}) {
    return props.editable ?? false ? EditableBlock(props) : StaticBlock(props)
}