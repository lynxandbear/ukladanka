import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MirrorSize, SlotSize, SlotSizeName} from "../svg/MirrorSize";

type MirrorColors = {[mirrorSize in MirrorSize]: string}
type Slots = {[slotSize in SlotSizeName]: MirrorColors}

export interface SetColorData {
    slot: SlotSizeName,
    mirror: MirrorSize,
    color: string
}

export interface PictureState {
    slots: Slots
    error?: string
}


function initialMirrorColorsFor(slot: SlotSizeName): MirrorColors {
    return Object.fromEntries(SlotSize.fromName(slot).mirrors.map(s => [s, "none"])) as MirrorColors;
}

function initialState(): PictureState {
    return {
        slots: Object.fromEntries(SlotSize.allNames.map(s => [s, initialMirrorColorsFor(s)])) as Slots,
        error: undefined
    }
}

const pictureSlice = createSlice({
    name: 'slots',
    initialState: initialState(),
    reducers: {
        setColor(state, {payload: {slot, mirror, color}}: PayloadAction<SetColorData>) {
            const mirrorColors = state.slots[slot]
            if (mirrorColors === undefined) {
                state.error = `Unknown slot size: ${slot}`
                return
            } 
            
            if (!Object.hasOwn(mirrorColors, mirror)) {
                state.error = `This slot (${slot}) cannot have this mirror (${mirror}) inside`
                return
            } 
            
            mirrorColors[mirror] = color
        }        
    }
})

export const { setColor } = pictureSlice.actions


export function selectColors(state: PictureState) {
    return state.slots
} 
export const pictureReducer = pictureSlice.reducer