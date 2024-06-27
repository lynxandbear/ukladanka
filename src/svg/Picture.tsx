import { Block } from "./Block"
import { Block23 } from "./Block23"
import { BlockId, BlockSize } from "./BlockSize"
import { MirrorProps } from "./Mirror"

export interface PictureProps {
    width:  number
    height: number

    highlighted?: BlockId
    strokeColor?: string

    mirrors182? : MirrorProps[]
    mirrors111? : MirrorProps[]
    mirrors67?  : MirrorProps[]
    mirrors40?  : MirrorProps[]

    mirror23Color? : string
}

const Picture = (props: PictureProps) =>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        width={props.width} height={props.height} 
        viewBox="0 0 340 230" fill="none">
        <g transform="translate(5,5)">
            <rect width="330" height="220" rx="3" stroke={props.strokeColor ?? "black"} />
            <Block size={BlockSize.XL} x={16.5}  y={19}  orientation={180} mirrors={props.mirrors182 ?? []}         blockColor={props.highlighted == BlockId.XL ? "rgb(25, 118, 210)" : "none"} strokeColor={props.strokeColor}/>
            <Block size={BlockSize.L}  x={202.5} y={19}  orientation={270} mirrors={props.mirrors111 ?? []}         blockColor={props.highlighted == BlockId.L ? "rgb(25, 118, 210)" : "none"}  strokeColor={props.strokeColor}/>
            <Block size={BlockSize.M}  x={246.5} y={134} orientation={0}   mirrors={props.mirrors67 ?? []}          blockColor={props.highlighted == BlockId.M ? "rgb(25, 118, 210)" : "none"}  strokeColor={props.strokeColor} />
            <Block size={BlockSize.S}  x={202.5} y={161} orientation={90}  mirrors={props.mirrors40 ?? []}          blockColor={props.highlighted == BlockId.S ? "rgb(25, 118, 210)" : "none"}  strokeColor={props.strokeColor}/>
            <Block23                   x={202.5} y={134}                   mirrorColor={props.mirror23Color ?? "none" }  blockColor={props.highlighted == BlockId.XS ? "rgb(25, 118, 210)" : "none"} strokeColor={props.strokeColor}/>
        </g>
    </svg>

export default Picture