import {immerable} from "immer";

export interface EditorPosition {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
}

export enum MirrorSize {
    XL = 182,
    L = 111,
    M = 67,
    S = 40,
    XS = 23
}

export enum SlotSizeName {
    XL = "XL",
    L = "L",
    M = "M",
    S = "S",
    XS = "XS"
}

export class SlotSize {
    [immerable] = true
    
    static readonly XL = new SlotSize(SlotSizeName.XL,
        16.5, 19, 180,
        182, 182, 
        [MirrorSize.XL, MirrorSize.L, MirrorSize.M, MirrorSize.S],
        { vertical: "top", horizontal: "right"})
    
    static readonly L = new SlotSize(SlotSizeName.L,
        202.5, 19, 270,
        111, 111, 
        [MirrorSize.L, MirrorSize.M, MirrorSize.S],
        { vertical: "top", horizontal: "left"})
    
    static readonly M = new SlotSize(SlotSizeName.M,
        246.5, 134, 0,
        67, 67,
        [MirrorSize.M, MirrorSize.S],
        { vertical: "bottom", horizontal: "left"})
    
    static readonly S = new SlotSize(SlotSizeName.S,
        202.5, 161, 90,
        40, 40, 
        [MirrorSize.S],
        { vertical: "bottom", horizontal: "left" })
    
    static readonly XS = new SlotSize(SlotSizeName.XS,
        202.5, 134, 0,
        40, 23, 
        [MirrorSize.XS],
        { vertical: "bottom", horizontal: "left" })
    
    private static readonly byName = {
        "XL": SlotSize.XL,
        "L": SlotSize.L,
        "M": SlotSize.M,
        "S": SlotSize.S,
        "XS": SlotSize.XS,
    }
    static readonly all = Object.values(SlotSize.byName)
    static readonly allNames: SlotSizeName[] = [
        SlotSizeName.XL, 
        SlotSizeName.L, 
        SlotSizeName.M, 
        SlotSizeName.S, 
        SlotSizeName.XS
    ]
    
    static fromName(name: SlotSizeName) {
        return this.byName[name]
    }
    
    private constructor(
        public readonly name: SlotSizeName,
        public readonly x: number,
        public readonly y: number,
        public readonly orientation: 0 | 90 | 180 | 270,
        public readonly width: number, 
        public readonly height: number,        
        public readonly mirrors: MirrorSize[],
        public readonly editorPosition: EditorPosition) {
    }
}