import { Paper, Popover, Stack, styled } from "@mui/material"
import { Block } from "./Block"
import { Block23 } from "./Block23"
import { BlockId, BlockSize } from "./BlockSize"
import { MirrorProps } from "./Mirror"
import { useState } from "react"
import MirrorControl from "../controls/MirrorControls"

export interface PictureProps {
    width:  number | string
    height: number | string

    highlighted?: BlockId
    strokeColor?: string

    mirrors182? : MirrorProps[]
    mirrors111? : MirrorProps[]
    mirrors67?  : MirrorProps[]
    mirrors40?  : MirrorProps[]

    mirror23Color? : string

    onBlock182Click? : React.MouseEventHandler<SVGGElement>
    onBlock111Click? : React.MouseEventHandler<SVGGElement>
    onBlock67Click?  : React.MouseEventHandler<SVGGElement>
    onBlock40Click?  : React.MouseEventHandler<SVGGElement>
    onBlock23Click?  : React.MouseEventHandler<SVGGElement>
}

const ColorPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  elevation: 3
}));

export default function Picture(props: PictureProps) {    
    return(<>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            width={props.width} height={props.height} 
            viewBox="0 0 340 230" fill="none"
            pointerEvents="none">
            <g transform="translate(5,5)">
                <rect width="330" height="220" rx="3" stroke={props.strokeColor ?? "black"}  />
                <Block size={BlockSize.XL} 
                  x={16.5} y={19} orientation={180} 
                  mirrors={props.mirrors182 ?? []}              
                  blockColor={props.highlighted == BlockId.XL ? "rgb(25, 118, 210)" : "none"} 
                  strokeColor={props.strokeColor}
                  onClick={props.onBlock182Click} />

                <Block size={BlockSize.L} 
                  x={202.5} y={19} orientation={270} 
                  mirrors={props.mirrors111 ?? []}
                  blockColor={props.highlighted == BlockId.L ? "rgb(25, 118, 210)" : "none"}
                  strokeColor={props.strokeColor}
                  onClick={props.onBlock111Click} />

                <Block size={BlockSize.M} 
                  x={246.5} y={134} orientation={0}  
                  mirrors={props.mirrors67 ?? []}
                  blockColor={props.highlighted == BlockId.M ? "rgb(25, 118, 210)" : "none"}
                  strokeColor={props.strokeColor}
                  onClick={props.onBlock67Click} />

                <Block size={BlockSize.S} 
                  x={202.5} y={161} orientation={90}
                  mirrors={props.mirrors40 ?? []}
                  blockColor={props.highlighted == BlockId.S ? "rgb(25, 118, 210)" : "none"}
                  strokeColor={props.strokeColor}
                  onClick={props.onBlock40Click} />

                <Block23                  
                  x={202.5} y={134}
                  mirrorColor={props.mirror23Color ?? "none" }
                  blockColor={props.highlighted == BlockId.XS ? "rgb(25, 118, 210)" : "none"}
                  strokeColor={props.strokeColor}
                  onClick={props.onBlock23Click} />
            </g>
        </svg>
    </>)
}